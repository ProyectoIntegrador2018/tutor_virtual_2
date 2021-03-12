import SessionsController from "../controllers/SessionsController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";

export const routes: IRoute[] = [
  new Route({
    path: "/login",
    method: "POST",
    withController: {
      action: "login",
      controller: SessionsController,
    },
  }),
  new Route({
    path: "/me",
    method: "GET",
    withController: {
      action: "me",
      controller: SessionsController,
    },
  }),
];
