import { User } from "../entities/UserEntity";
import { UserRoleName } from "../entities/RoleEntity";

export interface ICurrentViewer {
  isLoggedIn(): Promise<boolean>;
  getUser(): Promise<User | null>;
  getRole(): Promise<UserRoleName | null>;
}
