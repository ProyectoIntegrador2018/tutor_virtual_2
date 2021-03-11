import UserController from "../controllers/UserController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";

export const routes: IRoute[] = [
  new Route({
    path: "/users",
    method: "GET",
    withController: {
      action: "users",
      controller: UserController,
    },
  }),
];
