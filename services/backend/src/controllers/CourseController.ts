import joi from "joi";
import BaseController, { IArgs } from "./BaseController";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { CourseService } from "../services/CourseService";
import { logger } from "../utils/logger";

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
      seasonID: params.seasonID
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
      seasonID: joi.string().min(2).max(100).required()
    });
  }

  private async courses() {
    const result = await this.courseService.findAll();
    this.ok({ users: result });
  }

  private coursesParams() {
    return joi.object({});
  }
}


