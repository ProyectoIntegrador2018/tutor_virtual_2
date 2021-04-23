import BaseController from "./BaseController";
import joi from "joi";
import { ExcelFile } from "../lib/ExcelFile";
import { logger } from "../utils/logger";

/**
 * Example controller showing off the different functionalities available
 * in the BaseController. There are two different types of methods that can
 * be placed on a controller: Action methods and Parameters methods.
 *
 * See the routes/example.ts file for an example of how to call this controller
 * and map it to an actual endpoint.
 */
export default class ExampleController extends BaseController {
  /**
   * This is an action method. Action methods map to an endpoint in the app.
   * E.g. /api/create-tutor. We store any business logic in these methods.
   */
  private myAction() {
    // We can get the parameters the user sent through this method. This method
    // ensures we fetch the parameters from the proper place depending on the HTTP
    // verb. We can be sure that the params we get from this method have already been
    // validated.
    const params = this.getParams();

    // Never use console.log
    logger.info(JSON.stringify(params));

    // ...
    // fetch data from the db etc..
    // ...

    // the BaseController provides several methods to send responses back to the user.
    // These methods enforce that a JSON is sent back to the user and validates that only
    // one response is sent back.
    // See the PROTECTED METHODS on the BaseController for a list of all the available
    // responses.
    this.ok({ myResponse: true });
  }

  /**
   * This is a parameter method. For every action method that lives in a controller
   * there needs to be a parameter method called [nameOfActionMethod]Params. This
   * method is picked up by the BaseController and validates that the user has sent
   * the correct params as specified by the returned Joi object. If the user sent
   * the incorrect params the BaseController automatically sends a 406 response.
   *
   * Parameters method should be synchronous and should only return Joi objects,
   * no other logic should be placed here.
   */
  private myActionParams() {
    // See https://joi.dev/api/?v=17.4.0 for documentation on Joi.
    return joi.object({
      myParam: joi.string().required(),
      myNumberParam: joi.number().min(0).max(10).required(),
      myOptionalParam: joi.string().optional(),
    });
  }

  /**
   * You can have multiple Action methods on a single controller. But you should
   * group methods by piece of functionality.
   */
  private myOtherAction() {
    this.ok({ success: true, data: { myNumber: 1 } });
  }

  /**
   * Specify an empty joi object when no params should be used.
   */
  private myOtherActionParams() {
    return joi.object({});
  }

  /**
   * Example of how to load an excel file.
   * Go to routes/example.ts to see the middleware needed to have the excel file
   * present in _this.req.file_;
   */
  private async uploadExcelFile() {
    const excelFile = new ExcelFile({});
    await excelFile.load(this.req.file);
    const workbook = excelFile.getWorkbook();
    logger.info(`Workboook last modified: ${workbook.lastModifiedBy}`);
    logger.info(`Workbook creator: ${workbook.creator}`);
    // Do something with the workbook...
    // or...
    // Do something with the worksheets.
    const worksheets = excelFile.getWorksheets();
    logger.info(`Number of worksheets: ${worksheets.length}`);
    if (worksheets.length > 0) {
      logger.info(`First worksheet name: ${worksheets[0].name}`);
    }
    this.ok({ excelRead: true });
  }

  private uploadExcelFileParams() {
    return joi.object({});
  }
}
