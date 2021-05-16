import CourseController from "../controllers/CourseController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";
import { ExcelFileUpload } from "../middleware/ExcelFileUpload";

export const routes: IRoute[] = [
  new Route({
    path: "/courses",
    method: "GET",
    withController: {
      action: "courses",
      controller: CourseController,
    },
  }),
  new Route({
    path: "/course",
    method: "GET",
    withController: {
      action: "getCourse",
      controller: CourseController,
    },
  }),
  new Route({
    path: "/courses",
    method: "POST",
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
