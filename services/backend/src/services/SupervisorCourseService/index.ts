import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository, Container } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";
import { SupervisorCourse } from "../../entities/SupervisorCourseEntity";
import { UserService } from "../UserService";
import { UserRoleName } from "../../entities/RoleEntity";

@Service()
export class SupervisorCourseService {
  private userService: UserService;
  constructor(
    @InjectRepository(SupervisorCourse)
    private tutorCourseRepository: Repository<SupervisorCourse>
  ) {
    this.userService = Container.get(UserService);
  }

  public async create(args: ICreateArgs): Promise<SupervisorCourse> {
    const user = await this.userService.findOne(
      { id: args.supervisorId },
      { relations: ["role"] }
    );
    if (!user || user.role.name !== UserRoleName.SUPERVISOR) {
      throw new Error("User does not exist or user is not a supervisor!");
    }
    const supervisorCourse = new SupervisorCourse();
    Object.assign(supervisorCourse, args);
    return this.tutorCourseRepository.save(supervisorCourse);
  }
}
