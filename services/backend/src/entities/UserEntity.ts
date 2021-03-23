import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Role } from "./RoleEntity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  paternalName: string;

  @Column()
  maternalName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  hasAccountEnabled: boolean;

  @OneToOne(() => Role, (role) => role.user)
  @JoinColumn()
  role: Role;
}
