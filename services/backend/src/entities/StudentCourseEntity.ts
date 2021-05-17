import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Student } from "./StudentEntity";

/**
 * Represents the relationship between a student and a course.
 */
@Entity({ name: "student_courses" })
export class StudentCourse {
  @PrimaryColumn()
  courseKey: string;

  @PrimaryColumn({ type: "uuid" })
  studentId: string;

  @ManyToOne(() => Student, { primary: true })
  @JoinColumn({ name: "studentId" })
  student: Promise<Student>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
