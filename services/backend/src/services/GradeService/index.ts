import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";
import { Grade } from "../../entities/GradeEntity";
import { IUpdateArgs } from "./IUpdateArgs";

@Service()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>
  ) {}

  public async create(args: ICreateArgs): Promise<Grade> {
    const grade = new Grade();
    Object.assign(grade, args);
    return this.gradeRepository.save(grade);
  }

  public async update(id: string, args: IUpdateArgs): Promise<Grade> {
    return this.gradeRepository.save({ id, ...args });
  }
}
