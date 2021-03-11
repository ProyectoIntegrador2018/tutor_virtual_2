import { Router } from "express";

export interface IRoute {
  buildRoute: (router: Router) => void;
}
