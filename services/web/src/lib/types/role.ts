export enum UserRoleName {
  SUPERADMIN = "SUPERADMIN",
  SUPERVISOR = "SUPERVISOR",
  TUTOR = "TUTOR",
  ALLY = "ALLY",
}

export type Role = {
  id: string;
  name: UserRoleName;
};
