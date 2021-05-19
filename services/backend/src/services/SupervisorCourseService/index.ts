import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository, Container } from "typeorm-typedi-extensions";
import { SupervisorCourse } from "../../entities/SupervisorCourseEntity";
import { Course } from "../../entities/CourseEntity";
import { UserService } from "../UserService";
import { CourseService } from "../CourseService";
import { UserRoleName } from "../../entities/RoleEntity";
import { ICreateArgs } from "./ICreateArgs";
import { IFindCoursesForUser } from "./IFindCoursesForUser";
import { IUserOwnerOfCourse } from "./IUserOwnerOfCourse";

@Service()
export class SupervisorCourseService {
  private userService: UserService;
  private courseService: CourseService;
  constructor(
    @InjectRepository(SupervisorCourse)
    private supervisorCourseRepository: Repository<SupervisorCourse>
  ) {
    this.userService = Container.get(UserService);
    this.courseService = Container.get(CourseService);
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
    return this.supervisorCourseRepository.save(supervisorCourse);
  }

  public async findCoursesForUser({
    userId,
  }: IFindCoursesForUser): Promise<Course[]> {
    const supervisorCourses = await this.supervisorCourseRepository.find({
      supervisorId: userId,
    });
    let courses: Course[] = [];
    await Promise.all(
      supervisorCourses.map(async (sc) => {
        const course = await this.courseService.findOne({
          claveCurso: sc.courseKey,
        });
        if (course) {
          courses.push(course);
        }
      })
    );
    return courses;
  }

  public async isUserOwnerOfCourse({
    supervisorID,
    courseKey,
  }: IUserOwnerOfCourse): Promise<boolean> {
    const course = await this.supervisorCourseRepository.findOne({
      supervisorId: supervisorID,
      courseKey,
    });
    return course !== null && course !== undefined;
  }
}
