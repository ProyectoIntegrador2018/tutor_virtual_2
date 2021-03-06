import UserController from "../controllers/UserController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";
import { RouteAuthRolesEnum } from "../lib/RouteAuthRolesEnum";
import { ExcelFileUpload } from "../middleware/ExcelFileUpload";

export const routes: IRoute[] = [
  new Route({
    path: "/users",
    method: "GET",
    requireAuth: [RouteAuthRolesEnum.LOGGED_IN],
    withController: {
      action: "users",
      controller: UserController,
    },
  }),
  new Route({
    path: "/users",
    method: "POST",
    withController: {
      action: "create",
      controller: UserController,
    },
  }),
  new Route({
    path: "/users/supervisor/enable",
    method: "PUT",
    requireAuth: [RouteAuthRolesEnum.SUPERADMIN],
    withController: {
      action: "handleSupervisorAccountStatus",
      controller: UserController,
    },
  }),
  new Route({
    path: "/users/load-from-excel",
    method: "POST",
    requireAuth: [RouteAuthRolesEnum.SUPERADMIN],
    middleware: [ExcelFileUpload()],
    withController: {
      action: "createFromExcel",
      controller: UserController,
    },
  }),
  new Route({
    path: "/users/tutor/enable",
    method: "PUT",
    requireAuth: [RouteAuthRolesEnum.SUPERVISOR],
    withController: {
      action: "handleTutorAccountStatus",
      controller: UserController,
    },
  }),
  new Route({
    path: "/users/user/enable",
    method: "PUT",
    requireAuth: [RouteAuthRolesEnum.SUPERADMIN],
    withController: {
      action: "handleUserAccountStatus",
      controller: UserController,
    },
  }),
];
