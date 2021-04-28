import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./CourseEntity";
import { Student } from "./StudentEntity";

@Entity({ name: "grades" })
export class Grade {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Student, (student) => student.grades)
  student: Student;

  @ManyToOne(() => Course, (course) => course.grades)
  course: Course;

  @Column()
  grade: number;
}
