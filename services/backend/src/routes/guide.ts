import GuidesController from "../controllers/GuidesController";
import { IRoute } from "../lib/IRoute";
import { Route } from "../lib/Route";
import { GuideFileUpload } from "../middleware/GuideFileUpload";
import { RouteAuthRolesEnum } from "../lib/RouteAuthRolesEnum";

export const routes: IRoute[] = [
  new Route({
    path: "/guides",
    method: "POST",
    middleware: [GuideFileUpload()],
    requireAuth: [RouteAuthRolesEnum.SUPERADMIN],
    withController: {
      action: "uploadGuide",
      controller: GuidesController,
    },
  }),
  new Route({
    path: "/guides",
    method: "GET",
    withController: {
      action: "downloadGuide",
      controller: GuidesController,
    },
  }),
];
