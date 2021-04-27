import SessionsController from "../controllers/SessionsController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";
import { RouteAuthRolesEnum } from "../lib/RouteAuthRolesEnum";

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
    path: "/signout",
    method: "GET",
    requireAuth: [RouteAuthRolesEnum.LOGGED_IN],
    withController: {
      action: "signout",
      controller: SessionsController,
    },
  }),
];
