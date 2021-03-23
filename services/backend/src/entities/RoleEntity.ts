import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
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

  @OneToOne(() => User, (user) => user.role)
  user: User;
}
