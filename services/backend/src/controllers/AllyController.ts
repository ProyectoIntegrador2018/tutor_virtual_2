import joi from "joi";
import { ICreateArgs } from "../services/AllyService/ICreateArgs";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { ExcelFile } from "../lib/ExcelFile";
import { AllyService } from "../services/AllyService";
import BaseController, { IArgs } from "./BaseController";
import { Ally } from "../entities/AllyEntity";
import { logger } from "../utils/logger";
import Joi from "joi";

// Order of Atts in Excel Sheet
const allyProperty = ["vanity_id", "name", "type", "email", "contact"];

@Service()
export default class AllyController extends BaseController {
  allyService: AllyService;

  constructor(args: IArgs) {
    super(args);
    this.allyService = Container.get(AllyService);
  }

  private async uploadAllies() {
    const excelFile = new ExcelFile({});
    await excelFile.load(this.req.file);

    const worksheets = excelFile.getWorksheets();
    if (worksheets.length <= 0) {
      this.badRequest("No worksheets in Excel");
    }

    const worksheet = worksheets[0];

    const promises: Promise<Ally>[] = [];

    const schema: { [key: string]: Joi.Schema } = {
      vanity_id: Joi.string().required(),
      name: Joi.string().required(),
      type: Joi.string().required(),
      email: Joi.string().email(),
      contact: Joi.string(),
    };

    worksheet.eachRow((row, number) => {
      // Ignore Headers
      if (number > 1) {
        const ally: ICreateArgs & {
          [key: string]: string;
        } = {
          vanity_id: "",
          name: "",
          type: "",
        };
        row.eachCell((cell, colNumber) => {
          try {
            const value = Joi.attempt(
              cell.text,
              schema[allyProperty[colNumber - 1]]
            );
            ally[allyProperty[colNumber - 1]] = value;
          } catch (error) {
            logger.error(error);
          }
        });
        promises.push(this.allyService.create(ally));
      }
    });

    try {
      const allies = await Promise.all(
        promises.map((promise) =>
          promise.catch(({ message }) => ({
            message,
          }))
        )
      );
      this.ok({ allies });
    } catch (e) {
      logger.error(e);
      this.serverError();
    }
  }

  private uploadAlliesParams() {
    return joi.object({});
  }

  private async allies() {
    const params = this.getParams();
    let query = this.allyService.createQueryBuilder("allies");
    const skip = params.page * params.pageSize;
    query = query.skip(skip);
    const take = params.pageSize;
    query = query.take(take);
    const result = await query.getMany();
    this.ok({ allies: result });
  }

  private alliesParams() {
    return joi.object({
      page: joi.number().min(0).required(),
      pageSize: joi.number().min(0).max(50).required(),
    });
  }
}
