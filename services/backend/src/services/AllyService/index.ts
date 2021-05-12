import { Service } from "typedi";
import {
  Repository,
  FindOneOptions,
  FindConditions,
  FindManyOptions,
} from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";
import { Ally } from "../../entities/AllyEntity";
import { DEFAULT_ALLY_NAME } from "../../constants";

@Service()
export class AllyService {
  constructor(
    @InjectRepository(Ally)
    private allyRepository: Repository<Ally>
  ) {}

  public async create(args: ICreateArgs): Promise<Ally> {
    const ally = new Ally();
    ally.name = args.name;
    ally.vanity_id = args.vanity_id;
    ally.email = args.email;
    ally.contact = args.contact;
    ally.type = args.type;
    return this.allyRepository.save(ally);
  }

  public findOne(conds?: FindConditions<Ally>, opts?: FindOneOptions<Ally>) {
    return this.allyRepository.findOne(conds, opts);
  }

  public findAll(options?: FindManyOptions<Ally>) {
    return this.allyRepository.find(options);
  }

  public createQueryBuilder(alias: string) {
    return this.allyRepository.createQueryBuilder(alias);
  }

  public async getStudentsFromVanityId(vanity_id: string) {
    const ally = await this.allyRepository.findOne({
      where: { vanity_id },
      relations: ["students"],
    });

    if (!ally) {
      return [];
    }

    return ally.students;
  }

  public async getDefaultAlly() {
    let ally = await this.findOne({ name: DEFAULT_ALLY_NAME });
    if (!ally) {
      const vanityId = "00000000";
      const email = "nocontacto@noaliado.com";
      const contact = "N/A";
      const type = "N/A";
      ally = await this.create({
        name: DEFAULT_ALLY_NAME,
        vanity_id: vanityId,
        email,
        contact,
        type,
      });
    }
    return ally;
  }
}
