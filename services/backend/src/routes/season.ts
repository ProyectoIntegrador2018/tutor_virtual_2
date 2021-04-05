import SeasonController from "../controllers/SeasonController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";

export const routes: IRoute[] = [
  new Route({
    path: "/seasons",
    method: "POST",
    withController: {
      action: "create",
      controller: SeasonController,
    },
  }),
];
