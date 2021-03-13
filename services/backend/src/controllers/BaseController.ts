import express from "express";
import Joi from "joi";
import { ICurrentViewer } from "../lib/ICurrentViewer";
import { logger } from "../utils/logger";

export type THttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface IArgs {
  req: express.Request;
  res: express.Response;
  /**
   * Specifies which controller method will handle the current request.
   * This action must match to one of the methods of the controller.
   */
  action: string;
  currentViewer: ICurrentViewer;
}

/**
 * Every controller should extend this controller to get basic functionality
 * done such as param validation.
 */
export default abstract class BaseController {
  protected readonly req: express.Request;
  protected readonly res: express.Response;
  protected readonly action: string;
  protected readonly cv: ICurrentViewer;
  private hasSentResponse: boolean;
  constructor({ req, res, action, currentViewer }: IArgs) {
    this.req = req;
    this.res = res;
    this.action = action;
    this.cv = currentViewer;
    this.hasSentResponse = false;
  }

  /**
   * Calling this method will start the request-response cycle with the specified action. This is the only
   * method that should be publicly called with any controller.
   */
  public async handleRequest() {
    const requestHandlerMethod = (this as any)[this.action];
    if (!this.isValidAction(requestHandlerMethod)) {
      throw new Error(
        `${this.action} is not a function of type () => Promise<void>! Make sure the 'action' param
        is set to an existen method!`
      );
    }
    if (!(await this.hasValidParams())) {
      return this.notAcceptable();
    }

    try {
      let method = requestHandlerMethod.bind(this);
      await method();
    } catch (err) {
      logger.error(
        `An error ocurred while handling the request in <${
          (this as any).constructor.name
        }:${this.action}>!`
      );
      logger.error(err);
      if (!this.hasSentResponse) {
        this.serverError();
      }
    }
  }

  // =========================== PROTECTED METHODS ========================

  /**
   * Sends a HTTP 200 OK response with data as the response body.
   * @param data The data to send back to the client in JSON format.
   * @param msg Status message in the response
   */
  protected ok(data: any, msg: string = "Success") {
    this.sendResponse(200, data, msg);
  }

  /**
   * Sends a HTTP 406 Not Acceptable with an empty body.
   * @param msg Status message in the response
   */
  protected notAcceptable(msg: string = "Not acceptable") {
    this.sendResponse(406, {}, msg);
  }

  /**
   * Triggers an HTTP redirect to the specified URL.
   * @param url The URL to redirect to.
   * @param redirectCode A 3XX status code. Defaults to 302.
   */
  protected redirect(url: string, redirectCode: number = 302) {
    if (this.hasSentResponse) {
      throw new Error("Attempted to redirect but a response was already sent!");
    }
    this.hasSentResponse = true;
    this.res.redirect(redirectCode, url);
  }

  /**
   * Sends a HTTP 404 Not Found with an empty body.
   * @param msg Status message in the response
   */
  protected notFound(msg: string = "Resource not found") {
    this.sendResponse(404, {}, msg);
  }

  /**
   * Sends a HTTP 401 Bad Request with an empty body.
   * @param msg Status message in the response
   */
  protected badRequest(msg: string = "Bad request") {
    this.sendResponse(401, {}, msg);
  }

  /**
   * Sends a HTTP 403 Forbidden with an empty body.
   * @param msg Status message in the response
   */
  protected forbidden(msg: string = "Forbidden") {
    this.sendResponse(403, {}, msg);
  }

  /**
   * Sends a HTTP 500 Server Error with an empty body.
   */
  protected serverError() {
    this.sendResponse(500, {}, "Server error");
  }

  /**
   * Calling this method will return the request parameters sent by the client.
   * It is guaranteed that the parameters have already been validated.
   */
  protected getParams() {
    const method = this.req.method;
    if (!this.isAllowedHttpMethod(method)) {
      throw new Error(
        "Unallowed http method, please use one of the following: GET, PUT, POST, DELETE"
      );
    }
    switch (method) {
      case "GET":
        return this.req.query;
      case "POST":
      case "PUT":
      case "DELETE":
        return this.req.body;
    }
  }

  // =========================== PRIVATE METHODS ========================

  private sendResponse(status: number, data: any, message: string) {
    if (this.hasSentResponse) {
      throw new Error("A response has already been sent!");
    }
    this.hasSentResponse = true;
    this.res.statusMessage = message;
    this.res.status(status).json(data);
  }

  private async hasValidParams(): Promise<boolean> {
    const params = this.getParams();
    const schemaFn = (this as any)[this.getSchemaMethodName()];
    if (!this.isValidParamsFn(schemaFn)) {
      throw new Error(
        `${this.getSchemaMethodName()} is not a function of type () => Joi.Schema`
      );
    }
    const schema = schemaFn();
    try {
      await schema.validateAsync(params);
    } catch (err) {
      logger.error(`Invalid params for ${this.action} action!`);
      logger.error(err);
      return false;
    }
    return true;
  }

  private isValidAction(something: any): something is () => Promise<void> {
    // TODO: bruh
    return typeof something === "function";
  }

  private isValidParamsFn(something: any): something is () => Joi.Schema {
    // TODO: bruh
    return typeof something === "function";
  }

  private isAllowedHttpMethod(method: string): method is THttpMethod {
    const methods = ["GET", "POST", "PUT", "DELETE"];
    return methods.includes(method);
  }

  private getSchemaMethodName() {
    return `${this.action}Params`;
  }
}
