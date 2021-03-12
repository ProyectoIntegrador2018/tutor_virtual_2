import { Service } from "typedi";
import * as argon2 from "argon2";
import { Repository } from "typeorm";
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
    const hash = await argon2.hash(args.password);
    user.password = hash;
    user.role = args.role;
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  public findAll() {
    return this.userRepository.find();
  }
}
