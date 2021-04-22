import ExcelJS from "exceljs";
import { logger } from "../utils/logger";

interface IExcelFileArgs {}

/**
 * Utility class to read excel files and manipulate them.
 */
export class ExcelFile {
  private readonly workbook: ExcelJS.Workbook;
  private hasLoadedFile: boolean;

  constructor(_args: IExcelFileArgs) {
    this.workbook = new ExcelJS.Workbook();
    this.hasLoadedFile = false;
  }

  /**
   * Loads the excel file.
   * @param file The excel file to load.
   */
  public async load(file: Express.Multer.File) {
    try {
      await this.workbook.xlsx.load(file.buffer);
      logger.info(
        `Excel file with name: ${file.filename} has been loaded succesfully.`
      );
      this.hasLoadedFile = true;
    } catch (err) {
      logger.error("An error ocurred while reading the excel file.");
      logger.error(err);
      throw err;
    }
  }

  /**
   * Gets the parsed excel workbook. Throws an error if the file has not been loaded yet.
   * @returns the parsed excel workbook.
   */
  public getWorkbook(): ExcelJS.Workbook {
    if (!this.hasLoadedFile) {
      throw new Error(
        "Tried to get workbook but the excel file has not been loaded!"
      );
    }
    return this.workbook;
  }

  /**
   * Gets each worksheet present in the parsed workbook.
   */
  public getWorksheets(): ExcelJS.Worksheet[] {
    const workbook = this.getWorkbook();
    const worksheets: ExcelJS.Worksheet[] = [];
    workbook.eachSheet((worksheet, _sheetId) => {
      worksheets.push(worksheet);
    });
    return worksheets;
  }
}
