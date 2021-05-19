import { ExcelFileUpload } from "../middleware/ExcelFileUpload";
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
  new Route({
    path: "/grades/load-from-excel",
    method: "POST",
    middleware: [ExcelFileUpload()],
    withController: {
      action: "uploadGrades",
      controller: GradeController,
    },
  }),
];
