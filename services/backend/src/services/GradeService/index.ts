import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ICreateArgs } from "./ICreateArgs";
import { Grade } from "../../entities/GradeEntity";
import { IUpdateArgs } from "./IUpdateArgs";
import { logger } from "../../utils/logger";

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

  public async createOrUpdate(args: ICreateArgs): Promise<Grade> {
    const grade = await this.gradeRepository.findOne({
      where: {
        student: args.student,
        course: args.course,
        activity: args.activity,
      },
    });
    if (grade) {
      const updatedGrade = new Grade();
      updatedGrade.grade = args.grade;
      try {
        await this.gradeRepository.update(grade.id, updatedGrade);
        return (await this.gradeRepository.findOne({
          where: {
            student: args.student,
            course: args.course,
            activity: args.activity,
          },
        })) as Grade;
      } catch (error) {
        logger.error("Could not create Grade");
        logger.error(error);
      }
    }
    return this.create(args);
  }

  public async update(id: string, args: IUpdateArgs): Promise<Grade> {
    return this.gradeRepository.save({ id, ...args });
  }
}
