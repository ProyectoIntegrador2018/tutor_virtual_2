import { Request, Response, NextFunction } from "express";
import { RouteAuthRolesEnum } from "../lib/RouteAuthRolesEnum";
import { CurrentViewer } from "../lib/CurrentViewer";

export const RequireAuth = (allowedRoles: RouteAuthRolesEnum[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (allowedRoles.length === 0) {
      return next();
    }

    const cv = CurrentViewer.buildFromBearerToken(req);
    if (
      allowedRoles.includes(RouteAuthRolesEnum.NOT_LOGGED_IN) &&
      !(await cv.isLoggedIn())
    ) {
      return next();
    }

    if (
      allowedRoles.includes(RouteAuthRolesEnum.LOGGED_IN) &&
      (await cv.isLoggedIn())
    ) {
      return next();
    }

    const role = await cv.getRole();
    if (!role) {
      return res.status(403).json({});
    }
    const isAllowed = allowedRoles.some(
      (allowedRole) =>
        allowedRole.toString().toUpperCase() === role.toString().toUpperCase()
    );
    if (!isAllowed) {
      return res.status(403).json({});
    }
    return next();
  };
};
