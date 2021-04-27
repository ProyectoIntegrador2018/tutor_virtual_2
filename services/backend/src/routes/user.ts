import UserController from "../controllers/UserController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";
import { RouteAuthRolesEnum } from "../lib/RouteAuthRolesEnum";

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
    path: "/users/tutor/enable",
    method: "PUT",
    requireAuth: [RouteAuthRolesEnum.SUPERVISOR],
    withController: {
      action: "handleTutorAccountStatus",
      controller: UserController,
    },
  }),
];
