/**
 * Allowed authentication roles for a given route.
 * Keep in sync with UserRoleName for USER ROLES.
 */
export enum RouteAuthRolesEnum {
  SUPERADMIN = "SUPERADMIN",
  SUPERVISOR = "SUPERVISOR",
  ALLY = "ALLY",
  TUTOR = "TUTOR",
  NOT_LOGGED_IN = "NOT_LOGGED_IN",
  LOGGED_IN = "LOGGED_IN",
}
