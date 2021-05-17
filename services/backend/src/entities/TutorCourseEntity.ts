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
 * Represents the relationship between a tutor and a course.
 */
@Entity({ name: "tutor_courses" })
export class TutorCourse {
  @PrimaryColumn()
  courseKey: string;

  @PrimaryColumn({ type: "uuid" })
  tutorId: string;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({ name: "tutorId" })
  tutor: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
