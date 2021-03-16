import { Role } from "./role";

export type User = {
  id: string;
  firstName: string;
  paternalName: string;
  maternalName: string;
  email: string;
  hasAccountEnabled: boolean;
  role?: Role;
};
