import joi from "joi";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { logger } from "../utils/logger";
import BaseController, { IArgs } from "./BaseController";
import { GradeService } from "../services/GradeService";
import { ExcelFile } from "../lib/ExcelFile";
import { Grade } from "../entities/GradeEntity";
import { StudentService } from "../services/StudentService";
import { CourseService } from "../services/CourseService";
import { Row, Worksheet } from "exceljs";
import { Course } from "../entities/CourseEntity";

@Service()
export default class GradeController extends BaseController {
  gradeService: GradeService;
  studentService: StudentService;
  courseService: CourseService;

  constructor(args: IArgs) {
    super(args);
    this.gradeService = Container.get(GradeService);
    this.studentService = Container.get(StudentService);
    this.courseService = Container.get(CourseService);
  }

  private async create() {
    const params = this.getParams();
    const grade = await this.gradeService.create({
      course: params.course_id,
      student: params.student_id,
      grade: params.grade,
      activity: params.activity,
    });
    logger.info(`Season "${grade.id}" succesfully created!`);
    this.ok({ grade });
  }

  private createParams() {
    return joi.object({
      course_id: joi.string().required(),
      student_id: joi.string().required(),
      grade: joi.number().required(),
      activty: joi.number().required(),
    });
  }

  private async uploadGrades() {
    const excelFile = new ExcelFile({});
    await excelFile.load(this.req.file);
    const worksheets = excelFile.getWorksheets();
    if (worksheets.length <= 0) {
      return this.notAcceptable(
        "El archivo excel no tiene el formato esperado."
      );
    }

    const worksheet = worksheets[0];

    const { course_id } = this.getParams();
    const course = await this.courseService.findOne({ id: course_id });

    if (!course) {
      return this.notAcceptable("El curso que quiere calificar no existe");
    }

    try {
      const result = await this.parseGradeExcelRows(worksheet, course);
      this.ok({ grades: result });
    } catch (e) {
      logger.error(e);
      this.serverError();
    }
  }

  private uploadGradesParams() {
    return joi.object({
      course_id: joi.string().required(),
    });
  }

  private async parseGradeExcelRows(worksheet: Worksheet, course: Course) {
    const students: Promise<{
      [key: string]: (
        | Grade
        | { error: boolean; message: string; activity: number }
      )[];
    }>[] = [];
    worksheet.eachRow((row, number) => {
      // Ignore Headers
      if (number > 2) {
        try {
          students.push(this.parseGradeExcelRow(row, course));
          logger.debug("yo");
        } catch (err) {
          logger.error(
            "Some error happend while parsing an excel row to create a grade"
          );
          logger.error(err);
        }
      }
    });
    return Promise.all(students);
  }

  private async parseGradeExcelRow(row: Row, course: Course) {
    const gradeColumn = "E";
    const username = row.getCell("A").text;
    const student = await this.studentService.findOne({ username });
    const grades = [];
    const result: {
      [key: string]: (
        | Grade
        | { error: boolean; message: string; activity: number }
      )[];
    } = {};
    if (!student) {
      logger.error("Student not fount");
      return result;
    }
    const activityNumber = course.activities || "0";
    for (let index = 0; index < activityNumber; index++) {
      const currentColumn = String.fromCharCode(
        gradeColumn.charCodeAt(0) + index
      );
      const grade = row.getCell(currentColumn).text;
      const gradeobj = {
        grade: parseInt(grade),
        activity: index,
        student: student.id,
        course: course.id,
      };
      try {
        grades.push(await this.gradeService.createOrUpdate(gradeobj));
      } catch (error) {
        grades.push({ error: true, message: error.message, activity: index });
      }
    }
    result[student.id] = grades;
    return result;
  }
}
