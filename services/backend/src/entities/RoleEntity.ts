import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";

export enum UserRoleName {
  SUPERADMIN = "SUPERADMIN",
  SUPERVISOR = "SUPERVISOR",
  TUTOR = "TUTOR",
  ALLY = "ALLY",
}

@Entity({ name: "roles" })
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, enum: UserRoleName, type: "enum" })
  name: UserRoleName;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
