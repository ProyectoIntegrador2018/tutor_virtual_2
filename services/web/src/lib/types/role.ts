export enum UserRoleName {
  SUPERADMIN = "SUPERADMIN",
  SUPERVISOR = "SUPERVISOR",
  TUTOR = "TUTOR",
  ALLY = "ALLY",
  NO_AUTH = "NO_AUTH",
}

export type Role = {
  id: string;
  name: UserRoleName;
};
