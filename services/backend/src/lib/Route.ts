import { Router, Request, Response, NextFunction } from "express";
import BaseController, {
  THttpMethod,
  IArgs,
} from "../controllers/BaseController";
import { CurrentViewer } from "../lib/CurrentViewer";
import { IRoute } from "./IRoute";
import { logger } from "../utils/logger";

type TMiddleware = ((
  req: Request,
  res: Response,
  next: NextFunction
) => void)[];
type TRequestHandler = (req: Request, res: Response) => Promise<void>;

/**
 * The available options for a Route object.
 */
interface IRouteArgs<Controller> {
  /**
   * Specify this option if you don't need to customize
   * the request handler function.
   */
  withController?: {
    /**
     * The action method that will handle this route.
     */
    action: string;
    /**
     * The controller that will handle this route.
     */
    controller: new (args: IArgs) => Controller;
  };
  /**
   * The HTTP method to which this route will respond.
   */
  method: THttpMethod;
  /**
   * The path for this route, i.e. endpoint.
   */
  path: string;
  /**
   * Specify any additional middleware that should be executed
   * before the main request handler.
   */
  middleware?: TMiddleware;
  /**
   * Specify this option if you need a cusotm request handler. Note
   * that you will need to instantiate the controller manually.
   */
  withCustomCallback?: TRequestHandler;
}

/**
 * A Route is an endpoint that's available in the application.
 */
export class Route<Controller extends BaseController> implements IRoute {
  private action?: string;
  private controller?: new (args: IArgs) => Controller;
  private httpMethod: THttpMethod;
  private customCallback?: TRequestHandler;
  private middleware: TMiddleware;
  private path: string;

  constructor(args: IRouteArgs<Controller>) {
    if (!args.withController && !args.withCustomCallback) {
      throw new Error(`Route<${this.path}> could not be built because a
        controller was not specified and neither a custom request handler!`);
    }
    if (args.withController) {
      this.action = args.withController.action;
      this.controller = args.withController.controller;
    }
    if (args.withCustomCallback) {
      this.customCallback = args.withCustomCallback;
    }
    this.middleware = args.middleware || [];
    this.httpMethod = args.method;
    this.path = args.path;
  }

  /**
   * Builds a new route with the specified options for this Route.
   */
  public buildRoute(router: Router) {
    logger.info(`Registering ${this.httpMethod} Route<${this.path}>`);
    switch (this.httpMethod) {
      case "GET":
        router.get(this.path, this.middleware, this.getRequestHandler());
        break;
      case "POST":
        router.post(this.path, this.middleware, this.getRequestHandler());
        break;
      case "DELETE":
        router.delete(this.path, this.middleware, this.getRequestHandler());
        break;
      case "PUT":
        router.put(this.path, this.middleware, this.getRequestHandler());
        break;
    }
  }

  private getRequestHandler() {
    if (this.customCallback) {
      return this.customCallback;
    }
    return this.buildGenericHandler();
  }

  private buildGenericHandler(): (
    req: Request,
    res: Response
  ) => Promise<void> {
    if (!this.action || !this.controller) {
      logger.error(
        `Route<${this.path}> attempted to build a generic request handler but 
        couldn't because either an action method was not specified or 
        a controller was not specified!`
      );
      throw new Error(
        `Missing action or controller param inside 
        withController object for: Route<${this.path}>!`
      );
    }
    const action = this.action;
    const controller = this.controller;
    const handler = async (req: Request, res: Response) => {
      const cv = CurrentViewer.buildFromBearerToken(req);
      const instance = new controller({ req, res, action, currentViewer: cv });
      await instance.handleRequest();
    };
    return handler;
  }
}
