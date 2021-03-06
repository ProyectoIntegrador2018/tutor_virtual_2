import MeController from "../controllers/MeController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";

export const routes: IRoute[] = [
  new Route({
    path: "/me",
    method: "GET",
    withController: {
      action: "me",
      controller: MeController,
    },
  }),
  new Route({
    path: "/me/role",
    method: "GET",
    withController: {
      action: "role",
      controller: MeController,
    },
  }),
];
