import joi from "joi";
import { StudentService } from "../services/StudentService";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { logger } from "../utils/logger";
import BaseController, { IArgs } from "./BaseController";

@Service()
export default class StudentController extends BaseController {
  studentService: StudentService;

  constructor(args: IArgs) {
    super(args);
    this.studentService = Container.get(StudentService);
  }

  private async create() {
    const params = this.getParams();
    const student = await this.studentService.create({
      ...params,
    });
    logger.info(`Season "${student.id}" succesfully created!`);
    this.ok({ student });
  }

  private createParams() {
    return joi.object({
      username: joi.string().required(),
      password: joi.string().required(),
      name: joi.string().required(),
      paternal_name: joi.string().required(),
      maternal_name: joi.string().required(),
      country: joi.string().required(),
      state: joi.string().required(),
      city: joi.string().required(),
      ally: joi.string().required(),
      email: joi.string().required(),
    });
  }

  private async getStudentGradeFromCourse() {
    const params = this.getParams();

    const grades = await this.studentService.getCourseGrade(params);
    this.ok({ grades });
  }

  private getStudentGradeFromCourseParams() {
    return joi.object({
      course: joi.string().required(),
      student: joi.string().required(),
    });
  }

  private async getStudentGrades() {
    const params = this.getParams();

    const courses = await this.studentService.getGradesByCourse(params);
    this.ok({ courses });
  }

  private getStudentGradesParams() {
    return joi.object({
      student: joi.string().required(),
    });
  }

  private async getAllStudents() {
    let query = this.studentService.createQueryBuilder("students");
    const params = this.getParams();
    query = query.take(20).skip(params.page * 20);
    const students = await query.getMany();
    this.ok({ students });
  }

  private getAllStudentsParams() {
    return joi.object({
      page: joi.number().min(0).required(),
    });
  }
}
