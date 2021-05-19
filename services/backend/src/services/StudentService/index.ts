import { Service } from "typedi";
import { Repository, FindOneOptions, FindConditions } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";
import { Student } from "../../entities/StudentEntity";
import { Grade } from "../../entities/GradeEntity";
import { IGetCourseGrade } from "./IGetCourseGrade";
import { IGetGradesByCourse } from "./IGetGradesByCourse";

@Service()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>
  ) {}

  public async create(args: ICreateArgs): Promise<Student> {
    const student = new Student();
    Object.assign(student, args);
    return this.studentRepository.save(student);
  }

  public async findOne(
    conds?: FindConditions<Student>,
    opts?: FindOneOptions<Student>
  ): Promise<Student | undefined> {
    return this.studentRepository.findOne(conds, opts);
  }

  public async getCourseGrade({ course, student }: IGetCourseGrade) {
    return this.gradeRepository.find({ where: { course, student } });
  }

  public async getGradesByCourse({ student }: IGetGradesByCourse) {
    const grades = await this.gradeRepository.find({
      where: { student },
      relations: ["course"],
    });

    const gradeByCourse: { [key: string]: any } = {};

    grades.forEach((grade) => {
      if (!gradeByCourse[grade.course.name]) {
        gradeByCourse[grade.course.name] = [grade];
      } else {
        gradeByCourse[grade.course.name].push(grade);
      }
    });

    return gradeByCourse;
  }
}
