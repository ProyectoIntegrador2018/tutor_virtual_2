/**
 * Add the routes array here and add them to the main routes array.
 */

import { Router } from "express";
import { IRoute } from "../lib/IRoute";

// ================== import all the routes here =========================
import { routes as exampleRoutes } from "./example";
import { routes as user } from "./user";

// =======================================================================

const routes: IRoute[] = [...exampleRoutes, ...user];
const router = Router();
routes.forEach((route) => {
  route.buildRoute(router);
});
export { router };
