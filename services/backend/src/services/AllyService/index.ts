import { Service } from "typedi";
import * as argon2 from "argon2";
import {
  Repository,
  FindOneOptions,
  FindConditions,
  FindManyOptions,
} from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";
import { Ally } from "../../entities/AllyEntity";

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
}
