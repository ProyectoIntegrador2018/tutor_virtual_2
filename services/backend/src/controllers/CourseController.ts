import joi from "joi";
import BaseController, { IArgs } from "./BaseController";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { CourseService } from "../services/CourseService";
import { Course } from "../entities/CourseEntity"
import { logger } from "../utils/logger";
import { ExcelFile } from "../lib/ExcelFile";
import Joi from "joi";
import { ICreateArgs } from "../services/CourseService/ICreateArgs";

const courseProperty = ["topic", "name", "recognitionType", "duration", "url"];

@Service()
export default class CourseController extends BaseController {
  courseService: CourseService;

  constructor(args: IArgs) {
    super(args);
    this.courseService = Container.get(CourseService);
  }

  private async create() {
    const params = this.getParams();
    const course = await this.courseService.create({
      name: params.name,
      topic: params.topic,
      duration: params.duration,
      recognitionType: params.recognitionType,
      url: params.url,
      seasonID: params.seasonID,
    });
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
      seasonID: joi.string().min(2).max(100).required(),
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

  private async uploadCourses() {
    const excelFile = new ExcelFile({});
    await excelFile.load(this.req.file);
    const workbook = excelFile.getWorkbook();
    logger.info(`Workboook last modified: ${workbook.lastModifiedBy}`);
    logger.info(`Workbook creator: ${workbook.creator}`);
    // Do something with the workbook...
    // or...
    // Do something with the worksheets.
    const worksheets = excelFile.getWorksheets();
    if (worksheets.length <= 0) {
      this.badRequest("No worksheets in Excel");
    }

    const worksheet = worksheets[0];

    const promises: Promise<Course>[] = [];

    const schema: { [key: string]: Joi.Schema } = {
      topic: Joi.string().required(),
      name: Joi.string().required(),
      recognitionType: Joi.string(),
      duration: Joi.string().required(),
      url: Joi.string().required(),
      seasonID: Joi.string().required(),
    };

    worksheet.eachRow((row, number) => {
      // Ignore Headers
      if (number > 1) {
        const course: ICreateArgs & {
          [key: string]: string | number;
        } = {
          topic: "",
          name: "",
          recognitionType: "",
          duration: 0,
          url: "",
          seasonID: 0,
        };
        row.eachCell((cell, colNumber) => {
          try {
            const value = Joi.attempt(
              cell.text,
              schema[courseProperty[colNumber - 1]]
            );
            course[courseProperty[colNumber - 1]] = value;
          } catch (error) {
            logger.error(error);
          }
        });
        promises.push(this.courseService.create(course));
      }
    });

    try {
      const courses = await Promise.all(
        promises.map((promise) =>
          promise.catch(({ message }) => ({
            message,
          }))
        )
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
}
