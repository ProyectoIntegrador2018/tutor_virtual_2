import { ExcelFileUpload } from "../middleware/ExcelFileUpload";
import AllyController from "../controllers/AllyController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";
import { RouteAuthRolesEnum } from "../lib/RouteAuthRolesEnum";

export const routes: IRoute[] = [
  new Route({
    path: "/ally/upload-excel",
    method: "POST",
    middleware: [ExcelFileUpload()],
    requireAuth: [RouteAuthRolesEnum.SUPERADMIN, RouteAuthRolesEnum.SUPERVISOR],
    withController: {
      action: "uploadAllies",
      controller: AllyController,
    },
  }),
  new Route({
    path: "/allies",
    method: "GET",
    requireAuth: [RouteAuthRolesEnum.SUPERADMIN, RouteAuthRolesEnum.SUPERVISOR],
    withController: {
      action: "allies",
      controller: AllyController,
    },
  }),
  new Route({
    path: "/allies",
    method: "POST",
    requireAuth: [RouteAuthRolesEnum.SUPERADMIN, RouteAuthRolesEnum.SUPERVISOR],
    withController: {
      action: "create",
      controller: AllyController,
    },
  }),
];
