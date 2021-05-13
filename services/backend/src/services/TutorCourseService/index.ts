import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository, Container } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";
import { TutorCourse } from "../../entities/TutorCourseEntity";
import { UserService } from "../UserService";
import { UserRoleName } from "../../entities/RoleEntity";

@Service()
export class TutorCourseService {
  private userService: UserService;
  constructor(
    @InjectRepository(TutorCourse)
    private tutorCourseRepository: Repository<TutorCourse>
  ) {
    this.userService = Container.get(UserService);
  }

  public async create(args: ICreateArgs): Promise<TutorCourse> {
    const user = await this.userService.findOne(
      { id: args.tutorId },
      { relations: ["role"] }
    );
    if (!user || user.role.name !== UserRoleName.TUTOR) {
      throw new Error("User does not exist or user is not a tutor!");
    }
    const tutorCourse = new TutorCourse();
    Object.assign(tutorCourse, args);
    return this.tutorCourseRepository.save(tutorCourse);
  }
}
