import { Service } from "typedi";
import { Repository, FindOneOptions, FindConditions } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";
import { Student } from "../../entities/StudentEntity";

@Service()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>
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
}
