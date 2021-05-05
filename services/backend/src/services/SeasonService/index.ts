import { Season } from "../../entities/SeasonEntity";
import { Service } from "typedi";
import { Repository, FindManyOptions } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";

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

  public async find(opts?: FindManyOptions<Season>): Promise<Season[]> {
    return this.seasonRepository.find(opts);
  }
}
