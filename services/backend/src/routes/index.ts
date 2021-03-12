/**
 * Add the routes array here and add them to the main routes array.
 */

import { Router } from "express";
import { IRoute } from "../lib/IRoute";

// ================== import all the routes here =========================
import { routes as exampleRoutes } from "./example";
import { routes as user } from "./user";
import { routes as sessionRoutes } from "./session";
import { routes as meRoutes } from "./me";

// =======================================================================

const routes: IRoute[] = [
  ...exampleRoutes,
  ...user,
  ...sessionRoutes,
  ...meRoutes,
];
const router = Router();
routes.forEach((route) => {
  route.buildRoute(router);
});
export { router };
