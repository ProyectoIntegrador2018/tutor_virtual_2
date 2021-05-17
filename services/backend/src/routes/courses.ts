import CourseController from "../controllers/CourseController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";
import { ExcelFileUpload } from "../middleware/ExcelFileUpload";
import { RouteAuthRolesEnum } from "../lib/RouteAuthRolesEnum";

export const routes: IRoute[] = [
  new Route({
    path: "/courses",
    method: "GET",
    requireAuth: [RouteAuthRolesEnum.SUPERADMIN],
    withController: {
      action: "courses",
      controller: CourseController,
    },
  }),
  new Route({
    path: "/courses",
    method: "POST",
    requireAuth: [RouteAuthRolesEnum.SUPERADMIN],
    withController: {
      action: "create",
      controller: CourseController,
    },
  }),
  new Route({
    path: "/courses/upload-excel",
    method: "POST",
    middleware: [ExcelFileUpload()],
    withController: {
      action: "uploadCourses",
      controller: CourseController,
    },
  }),
];
