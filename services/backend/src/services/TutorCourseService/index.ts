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
import { IUserOwnerOfCourse } from "./IUserOwnerOfCourse";

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

  public async findCoursesForUser({
    userId,
  }: IFindCoursesForUser): Promise<Course[]> {
    const tutorCourses = await this.tutorCourseRepository.find({
      tutorId: userId,
    });
    let courses: Course[] = [];
    await Promise.all(
      tutorCourses.map(async (tc) => {
        const course = await this.courseService.findOne({
          claveCurso: tc.courseKey,
        });
        if (course) {
          courses.push(course);
        }
      })
    );
    return courses;
  }

  public async isUserOwnerOfCourse({
    userId,
    courseKey,
  }: IUserOwnerOfCourse): Promise<boolean> {
    const tutorCourses = await this.tutorCourseRepository.find({
      tutorId: userId,
      courseKey,
    });
    return tutorCourses != null;
  }
}
