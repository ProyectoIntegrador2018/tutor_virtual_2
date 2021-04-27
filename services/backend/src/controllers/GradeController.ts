import joi from "joi";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { logger } from "../utils/logger";
import BaseController, { IArgs } from "./BaseController";
import { GradeService } from "../services/GradeService";

@Service()
export default class GradeController extends BaseController {
  gradeService: GradeService;

  constructor(args: IArgs) {
    super(args);
    this.gradeService = Container.get(GradeService);
  }

  private async create() {
    const params = this.getParams();
    const grade = await this.gradeService.create({
      course: params.course_id,
      student: params.student_id,
      grade: params.grade,
    });
    logger.info(`Season "${grade.id}" succesfully created!`);
    this.ok({ grade });
  }

  private createParams() {
    return joi.object({
      course_id: joi.string().required(),
      student_id: joi.string().required(),
      grade: joi.number().required(),
    });
  }
}
