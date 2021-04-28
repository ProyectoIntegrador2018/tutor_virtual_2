import { Service } from "typedi";
import { Repository } from "typeorm";
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
}
