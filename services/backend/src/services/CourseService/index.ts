import { Service } from "typedi";
import { Repository, FindOneOptions, FindConditions } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";
import { Course } from "../../entities/CourseEntity";

@Service()
export class CourseService {
	constructor(
		@InjectRepository(Course)
		private courseRepository: Repository<Course>
	) {}

	public async create(args: ICreateArgs): Promise<Course> {
    const course = new Course();
    course.name = args.name;
    course.topic = args.topic;
    course.duration = args.duration;
    course.recognitionType = args.recognitionType;
    course.url = args.url;
    course.startDate = args.startDate;
    course.endDate = args.endDate;
    const savedCourse = await this.courseRepository.save(course);
    return savedCourse;
  }

  public findOne(conds?: FindConditions<Course>, opts?: FindOneOptions<Course>) {
    return this.courseRepository.findOne(conds, opts);
  }

  public findAll() {
    return this.courseRepository.find();
  }

  public createQueryBuilder(alias: string) {
    return this.courseRepository.createQueryBuilder(alias);
  }
}