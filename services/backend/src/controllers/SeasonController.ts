import joi from "joi";
import { SeasonService } from "../services/SeasonService";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { logger } from "../utils/logger";
import BaseController, { IArgs } from "./BaseController";

@Service()
export default class SeasonController extends BaseController {
  seasonService: SeasonService;

  constructor(args: IArgs) {
    super(args);
    this.seasonService = Container.get(SeasonService);
  }

  private async create() {
    const params = this.getParams();
    const season = await this.seasonService.create({
      starting: params.starting,
      ending: params.ending,
    });
    logger.info(`Season "${season.id}" succesfully created!`);
    this.ok({ season });
  }

  private createParams() {
    return joi.object({
      starting: joi.date().iso().less(joi.ref("ending")).required(),
      ending: joi.date().iso().required(),
    });
  }

  private async fetchSeasons() {
    const seasons = await this.seasonService.find();
    this.ok({ seasons });
  }

  private fetchSeasonsParams() {
    return joi.object({});
  }

  private async getCourses() {
    const params = this.getParams();
    const season_id = params.season_id;
    const courses = await this.seasonService.findCourses({ season_id: season_id });
    this.ok({ courses });
  }

  private getCoursesParams() {
    return joi.object({
      season_id: joi.string().min(2).max(200).required()
    })
  }
}
