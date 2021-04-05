import CourseController from "../controllers/CourseController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";

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
    path: "/courses",
    method: "POST",
    withController: {
      action: "create",
      controller: CourseController,
    },
  }),
];