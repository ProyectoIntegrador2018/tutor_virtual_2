import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository, Container } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";
import { IFindCoursesForUser } from "./IFindCoursesForUser";
import { TutorCourse } from "../../entities/TutorCourseEntity";
import { UserService } from "../UserService";
import { UserRoleName } from "../../entities/RoleEntity";
import { Course } from "../../entities/CourseEntity";
import { CourseService } from "../CourseService";

@Service()
export class TutorCourseService {
  private userService: UserService;
  private courseService: CourseService;
  constructor(
    @InjectRepository(TutorCourse)
    private tutorCourseRepository: Repository<TutorCourse>
  ) {
    this.userService = Container.get(UserService);
    this.courseService = Container.get(CourseService);
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

  private async findCoursesForUser({
    userId,
  }: IFindCoursesForUser): Promise<Course[]> {
    const tutorCourses = await this.tutorCourseRepository.find({
      tutorId: userId,
    });
    let courses: Course[] = [];
    await tutorCourses.forEach(async (tutorCourse) => {
      const course = await this.courseService.findOne({
        claveCurso: tutorCourse.courseKey,
      });
      if (course) {
        courses.push(course);
      }
    });
    return courses;
  }
}
