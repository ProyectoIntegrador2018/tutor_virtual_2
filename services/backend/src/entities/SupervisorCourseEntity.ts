import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./UserEntity";

/**
 * Represents the relationship between a supervisor and a course.
 */
@Entity({ name: "supervisor_courses" })
export class SupervisorCourse {
  @PrimaryColumn()
  courseKey: string;

  @PrimaryColumn({ type: "uuid" })
  supervisorId: string;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({ name: "supervisorId" })
  supervisor: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
