import joi from "joi";
import BaseController, { IArgs } from "./BaseController";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { CourseService } from "../services/CourseService";
import { SeasonService } from "../services/SeasonService";
import { SupervisorCourseService } from "../services/SupervisorCourseService";
import { TutorCourseService } from "../services/TutorCourseService";
import { Course } from "../entities/CourseEntity";
import { logger } from "../utils/logger";
import { ExcelFile } from "../lib/ExcelFile";
import Joi from "joi";
import { ICreateArgs } from "../services/CourseService/ICreateArgs";
import { format, add, parseISO } from "date-fns";
import { StudentCourseService } from "../services/StudentCourseService";
import { UserRoleName } from "../entities/RoleEntity";

const courseProperty = [
  "program",
  "topic",
  "name",
  "group",
  "claveCurso",
  "inscriptionStart",
  "inscriptionEnd",
  "startDate",
  "endDate",
  "recognitionType",
  "duration",
  "activities",
  "url",
];

@Service()
export default class CourseController extends BaseController {
  courseService: CourseService;
  seasonService: SeasonService;
  supervisorCourseService: SupervisorCourseService;
  tutorCourseService: TutorCourseService;
  studentCourseService: StudentCourseService;

  constructor(args: IArgs) {
    super(args);
    this.courseService = Container.get(CourseService);
    this.seasonService = Container.get(SeasonService);
    this.supervisorCourseService = Container.get(SupervisorCourseService);
    this.tutorCourseService = Container.get(TutorCourseService);
    this.studentCourseService = Container.get(StudentCourseService);
  }

  private async create() {
    const params = this.getParams();
    const course = await this.courseService.create({
      name: params.name,
      topic: params.topic,
      duration: params.duration,
      recognitionType: params.recognitionType,
      url: params.url,
      claveCurso: params.claveCurso,
      startDate: params.startDate,
      endDate: params.endDate,
    });
    const season = await this.seasonService.findOrCreate({
      starting: params.startDate,
      ending: params.endDate,
    });
    await this.courseService.addSeason(course.id, { season });
    await this.seasonService.addCourse(season.id, { course });
    logger.info(`Course "${course.name}" succesfully registered!`);
    this.ok({ course });
  }

  private createParams() {
    return joi.object({
      name: joi.string().min(2).max(50).required(),
      topic: joi.string().min(2).max(100).required(),
      duration: joi.number().required(),
      recognitionType: joi.string().min(2).max(50).required(),
      url: joi.string().min(2).max(100).required(),
      claveCurso: joi.string().min(2).max(100).required(),
      startDate: joi.date().iso().less(joi.ref("endDate")).required(),
      endDate: joi.date().iso().required(),
    });
  }

  private async courses() {
    const params = this.getParams();
    let query = this.courseService.createQueryBuilder("courses");
    const skip = params.page * params.pageSize;
    query = query.skip(skip);
    const take = params.pageSize;
    query = query.take(take);
    const result = await query.getMany();
    this.ok({ courses: result });
  }

  private coursesParams() {
    return joi.object({
      page: joi.number().min(0).required(),
      pageSize: joi.number().min(0).max(50).required(),
    });
  }

  private async getCourse() {
    const params = this.getParams();
    const course = await this.courseService.findOne({ id: params.id });
    const notFoundMsg = "Course does not exist.";
    if (!course) {
      return this.notFound(notFoundMsg);
    }
    this.ok({ course });
  }

  private getCourseParams() {
    return joi.object({
      id: joi.string().required(),
    });
  }

  private async uploadCourses() {
    const excelFile = new ExcelFile({});
    await excelFile.load(this.req.file);
    const worksheets = excelFile.getWorksheets();
    if (worksheets.length <= 0) {
      this.badRequest("No worksheets in Excel");
    }

    const worksheet = worksheets[0];

    const promises: Promise<Course>[] = [];
    let seasonDates: { starting: string; ending: string }[] = [];

    const schema: { [key: string]: Joi.Schema } = {
      topic: Joi.string().required(),
      name: Joi.string().required(),
      recognitionType: Joi.string(),
      duration: Joi.string().required(),
      url: Joi.string().required(),
      claveCurso: Joi.string().required(),
      startDate: Joi.date().required(),
      activities: Joi.number().required(),
      endDate: Joi.date().required(),
    };

    worksheet.eachRow((row, number) => {
      if (number > 1) {
        const course: ICreateArgs & {
          [key: string]: string | number;
        } = {
          topic: "",
          name: "",
          recognitionType: "",
          duration: 0,
          url: "",
          claveCurso: "",
          startDate: "",
          endDate: "",
          activities: 0,
        };
        row.eachCell((cell, colNumber) => {
          try {
            let value = Joi.attempt(
              cell.text,
              schema[courseProperty[colNumber - 1]]
            );
            if (
              courseProperty[colNumber - 1] === "startDate" ||
              courseProperty[colNumber - 1] === "endDate"
            ) {
              value = format(value, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
              value = add(parseISO(value), { days: 1 });
            }
            course[courseProperty[colNumber - 1]] = value;
          } catch (error) {
            logger.error(error);
          }
        });
        seasonDates.push({
          starting: course.startDate,
          ending: course.endDate,
        });
        promises.push(this.courseService.create(course));
      }
    });

    for (let i = 0; i < seasonDates.length; i++) {
      await this.seasonService.findOrCreate({
        starting: seasonDates[i].starting,
        ending: seasonDates[i].ending,
      });
    }

    try {
      const courses = await Promise.all(
        promises.map((promise) => {
          promise.catch(({ message }) => ({
            message,
          }));
          promise.then(async (course) => {
            let season = await this.seasonService.findOrCreate({
              starting: course.startDate,
              ending: course.endDate,
            });
            await this.courseService.addSeason(course.id, { season });
            await this.seasonService.addCourse(season.id, { course });
          });
        })
      );
      this.ok({ courses });
    } catch (e) {
      logger.error(e);
      this.serverError();
    }
  }

  private uploadCoursesParams() {
    return joi.object({});
  }

  private async supervisorCourses() {
    const me = await this.cv.getUser();
    if (!me) {
      return this.forbidden("User needs to be logged in!");
    }
    const courses = await this.supervisorCourseService.findCoursesForUser({
      userId: me.id,
    });
    this.ok({ courses });
  }

  private supervisorCoursesParams() {
    return joi.object({});
  }

  private async tutorCourses() {
    const me = await this.cv.getUser();
    if (!me) {
      return this.forbidden("User needs to be logged in!");
    }
    const courses = await this.tutorCourseService.findCoursesForUser({
      userId: me.id,
    });
    this.ok({ courses });
  }

  private tutorCoursesParams() {
    return joi.object({});
  }

  private async coursesStudents() {
    const me = await this.cv.getUser();
    const params = this.getParams();
    if (!me) {
      return this.forbidden("User needs to be logged in!");
    }

    const role = await this.cv.getRole();

    const course = await this.courseService.findOne({ id: params.id });

    const notFoundMsg = "Course does not exist.";
    if (!course) {
      return this.notFound(notFoundMsg);
    }

    const courseKey = course.claveCurso;

    if (role === UserRoleName.TUTOR) {
      const isOwner = await this.tutorCourseService.isUserOwnerOfCourse({
        userId: me.id,
        courseKey: courseKey,
      });

      if (!isOwner) {
        this.forbidden("You are not an owner of this course");
        return;
      }
    }

    const students = await this.studentCourseService.getStudentsFromCourse({
      courseKey: courseKey,
    });

    this.ok({ students });
  }

  private coursesStudentsParams() {
    return joi.object({
      id: joi.string().required(),
    });
  }
}
