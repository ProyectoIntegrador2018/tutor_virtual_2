import StudentController from "../controllers/StudentController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";
import { RouteAuthRolesEnum } from "../lib/RouteAuthRolesEnum";

export const routes: IRoute[] = [
  new Route({
    path: "/students",
    method: "POST",
    withController: {
      action: "create",
      controller: StudentController,
    },
  }),
  new Route({
    path: "/students/superadmin",
    method: "GET",
    requireAuth: [RouteAuthRolesEnum.SUPERADMIN],
    withController: {
      action: "getAllStudents",
      controller: StudentController,
    },
  }),
];
