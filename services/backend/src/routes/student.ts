import StudentController from "../controllers/StudentController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";

export const routes: IRoute[] = [
  new Route({
    path: "/students",
    method: "POST",
    withController: {
      action: "create",
      controller: StudentController,
    },
  }),
];
