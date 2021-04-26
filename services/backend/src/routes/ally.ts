import { ExcelFileUpload } from "../middleware/ExcelFileUpload";
import AllyController from "../controllers/AllyController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";

export const routes: IRoute[] = [
  new Route({
    path: "/ally/upload-excel",
    method: "POST",
    middleware: [ExcelFileUpload()],
    withController: {
      action: "uploadAllies",
      controller: AllyController,
    },
  }),
  new Route({
    path: "/allies",
    method: "GET",
    withController: {
      action: "allies",
      controller: AllyController,
    },
  }),
];
