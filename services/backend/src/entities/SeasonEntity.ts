import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../entities/CourseEntity"

@Entity({ name: "seasons" })
export class Season {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  starting: string;

  @Column({ type: "date" })
  ending: string;

  @OneToMany(() => Course, (course) => course.season)
  courses: Course[];
}
