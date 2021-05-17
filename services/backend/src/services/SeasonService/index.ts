import { Season } from "../../entities/SeasonEntity";
import { Service } from "typedi";
import { Repository, FindManyOptions, FindOneOptions, FindConditions } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";
import { IFindOrCreateArgs } from "./IFindOrCreateArgs";
import { IAddCourseArgs } from "./IAddCourseArgs";
import { Course } from "../../entities/CourseEntity";
import { logger } from "../../utils/logger";

@Service()
export class SeasonService {
  constructor(
    @InjectRepository(Season)
    private seasonRepository: Repository<Season>
  ) {}

  public async create(args: ICreateArgs): Promise<Season> {
    const season = new Season();
    season.starting = args.starting;
    season.ending = args.ending;
    return await this.seasonRepository.save(season);
  }

  public findOne(conds?: FindConditions<Season>, opts?: FindOneOptions<Season>) {
    return this.seasonRepository.findOne(conds, opts);
  }

  public async findOrCreate(args: IFindOrCreateArgs): Promise<Season> {
    let season = await this.seasonRepository.findOne({ starting: args.starting, ending: args.ending });
    if (!season) {
      const seasonData = this.seasonRepository.create({
        starting: args.starting,
        ending: args.ending
      });
      season = await this.seasonRepository.save(seasonData);
      logger.info(`Apertura de ${season.starting} - ${season.ending} creada con éxito!`);
    }
    return season;
  }

  public async addCourse(id: string, args: IAddCourseArgs) {
    let season = await this.seasonRepository.findOne({ id }, { relations: ["courses"] });
    if (season) {
      season.courses.push(args.course);
      this.seasonRepository.save(season);
    } else {
      logger.error("Season does not exist");
    }
    return season;
  }

  public async findCourses(id: string): Promise<Course[]> {
    const season = await this.seasonRepository.findOne({ id }, { relations: ["courses"] });
    if (!season) {
      return <Course[]>[]; 
    }
    return season.courses;
  }

  public async find(opts?: FindManyOptions<Season>): Promise<Season[]> {
    return this.seasonRepository.find(opts);
  }
}
