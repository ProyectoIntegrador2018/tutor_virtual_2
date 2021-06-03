import { Service } from "typedi";
import { Repository, FindOneOptions, FindConditions, In } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../entities/UserEntity";
import { TutorCourse } from "../../entities/TutorCourseEntity";
import { ICreateArgs } from "./ICreateArgs";
import { IAddArgs } from "./IAddArgs";
import { IGetTutorsArgs } from "./IGetTutorsArgs";
import { Course } from "../../entities/CourseEntity";

@Service()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TutorCourse)
    private tutorCourseRepo: Repository<TutorCourse>
  ) {}

  public async create(args: ICreateArgs): Promise<Course> {
    const course = new Course();
    course.name = args.name;
    course.topic = args.topic;
    course.duration = args.duration;
    course.recognitionType = args.recognitionType;
    course.url = args.url;
    course.claveCurso = args.claveCurso;
    course.startDate = args.startDate;
    course.endDate = args.endDate;
    course.activities = args.activities;
    const savedCourse = await this.courseRepository.save(course);
    return savedCourse;
  }

  public async addSeason(id: string, args: IAddArgs): Promise<Course> {
    return this.courseRepository.save({ id, ...args });
  }

  public findOne(
    conds?: FindConditions<Course>,
    opts?: FindOneOptions<Course>
  ) {
    return this.courseRepository.findOne(conds, opts);
  }

  public findAll() {
    return this.courseRepository.find();
  }

  public createQueryBuilder(alias: string) {
    return this.courseRepository.createQueryBuilder(alias);
  }

  public async getTutors({ courseKey }: IGetTutorsArgs): Promise<User[]> {
    const tutorCourses = await this.tutorCourseRepo.find({ courseKey });
    const tutors: User[] = [];
    await Promise.all(
      tutorCourses.map(async (tc) => {
        const user = await this.userRepository.findOne({ id: tc.tutorId });
        if (user) {
          tutors.push(user);
        }
      })
    );
    return tutors;
  }
}
