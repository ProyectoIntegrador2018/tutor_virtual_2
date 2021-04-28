import { Service } from "typedi";
import {
  Repository,
  FindOneOptions,
  FindConditions,
  FindManyOptions,
} from "typeorm";
import { nanoid } from "nanoid";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";
import { User } from "../../entities/UserEntity";

@Service()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  public async create(args: ICreateArgs): Promise<User> {
    const user = new User();
    user.firstName = args.firstName;
    user.maternalName = args.maternalName;
    user.paternalName = args.paternalName;
    user.email = args.email;
    user.password = args.password;
    user.role = args.role;
    let username = args.username;
    if (!username) {
      username = args.email.split("@")[0];
      const random = nanoid(4);
      username += random;
    }
    user.username = username;
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  public findOne(conds?: FindConditions<User>, opts?: FindOneOptions<User>) {
    return this.userRepository.findOne(conds, opts);
  }

  public findAll(options?: FindManyOptions<User>) {
    return this.userRepository.find(options);
  }

  public createQueryBuilder(alias: string) {
    return this.userRepository.createQueryBuilder(alias);
  }
}
