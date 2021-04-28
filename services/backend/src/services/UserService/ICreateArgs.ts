import { Role } from "../../entities/RoleEntity";

export interface ICreateArgs {
  firstName: string;
  paternalName: string;
  maternalName: string;
  email: string;
  password: string;
  role: Role;
  username?: string;
}
