import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./CourseEntity";
import { Student } from "./StudentEntity";

@Entity({ name: "grades" })
@Index(["course", "student", "activity"], { unique: true })
export class Grade {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Student, (student) => student.grades)
  student: Student;

  @ManyToOne(() => Course, (course) => course.grades)
  course: Course;

  @Column()
  grade: number;

  @Column()
  activity: number;
}
