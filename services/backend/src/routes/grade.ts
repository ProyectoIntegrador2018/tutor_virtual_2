import GradeController from "../controllers/GradeController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";

export const routes: IRoute[] = [
  new Route({
    path: "/grades",
    method: "POST",
    withController: {
      action: "create",
      controller: GradeController,
    },
  }),
];
