import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";
import { StudentCourse } from "../../entities/StudentCourseEntity";
import { IGetStudentsFromCourse } from "./IGetStudentsFromCourse";
import { Student } from "../../entities/StudentEntity";

@Service()
export class StudentCourseService {
  constructor(
    @InjectRepository(StudentCourse)
    private studentCourseRepository: Repository<StudentCourse>
  ) {}

  public async create(args: ICreateArgs): Promise<StudentCourse> {
    const studentCourse = new StudentCourse();
    Object.assign(studentCourse, args);
    return this.studentCourseRepository.save(studentCourse);
  }

  public async getStudentsFromCourse({
    courseKey,
  }: IGetStudentsFromCourse): Promise<Student[]> {
    const studentsCourses = await this.studentCourseRepository.find({
      where: { courseKey },
      relations: ["student"],
    });

    return Promise.all(
      studentsCourses.map((studentCourse) => studentCourse.student)
    );
  }
}
