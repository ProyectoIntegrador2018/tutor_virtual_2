/**
 * Add the routes array here and add them to the main routes array.
 */

import { Router } from "express";
import { IRoute } from "../lib/IRoute";

// ================== import all the routes here =========================
import { routes as exampleRoutes } from "./example";

// =======================================================================

const routes: IRoute[] = [...exampleRoutes];
const router = Router();
routes.forEach((route) => {
  route.buildRoute(router);
});
export { router };
