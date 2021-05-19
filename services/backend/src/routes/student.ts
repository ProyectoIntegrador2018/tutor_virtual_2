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
  new Route({
    path: "/student/course/grades",
    method: "GET",
    withController: {
      action: "getStudentGradeFromCourse",
      controller: StudentController,
    },
  }),
  new Route({
    path: "/student/grades",
    method: "GET",
    withController: {
      action: "getStudentGrades",
      controller: StudentController,
    },
  }),
];
