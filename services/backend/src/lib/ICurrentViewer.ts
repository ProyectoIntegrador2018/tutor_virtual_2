import { User } from "../entities/UserEntity";

export interface ICurrentViewer {
  isLoggedIn(): Promise<boolean>;
  getUser(): Promise<User | null>;
}
