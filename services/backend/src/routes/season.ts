import SeasonController from "../controllers/SeasonController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";
import { RouteAuthRolesEnum } from "../lib/RouteAuthRolesEnum";

export const routes: IRoute[] = [
  new Route({
    path: "/seasons",
    method: "POST",
    withController: {
      action: "create",
      controller: SeasonController,
    },
  }),
  new Route({
    path: "/seasons",
    method: "GET",
    withController: {
      action: "fetchSeasons",
      controller: SeasonController,
    },
    requireAuth: [RouteAuthRolesEnum.SUPERADMIN],
  }),
];
