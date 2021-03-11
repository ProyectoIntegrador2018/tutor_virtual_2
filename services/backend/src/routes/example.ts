import ExampleController from "../controllers/ExampleController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";

/**
 * To specify a new route you just need to add a new Route object to the routes array,
 * it'll be automatically picked up by the app and registered as a new endpoint.
 *
 * To better separate concerns, use a different file for each logical group of routes.
 * You just need to export a routes: IRoute[] variable with all the Route objects you want
 * to register. The in routes/index.ts you can just follow the instructions there to add
 * a new logical set of routes.
 *
 * For more information on the arguments for Route, check lib/Route.ts
 */

export const routes: IRoute[] = [
  // You can just specify the controller and the action method
  // that will handle the request and Route will handle it for you.
  new Route({
    path: "/example",
    method: "GET",
    withController: {
      action: "myAction",
      controller: ExampleController,
    },
  }),
  // Or you can pass in a custom callback.
  new Route({
    path: "/example-custom-callback",
    method: "GET",
    withCustomCallback: async (req, res) => {
      const controller = new ExampleController({
        req,
        res,
        action: "myOtherAction",
      });
      await controller.handleRequest();
    },
  }),
  // You can also specify middleware for a route.
  new Route({
    path: "/example-with-middleware",
    method: "GET",
    middleware: [
      (req, res, next) => {
        console.log("Im a middleware!");
        next();
      },
    ],
    withController: {
      action: "myOtherAction",
      controller: ExampleController,
    },
  }),
];
