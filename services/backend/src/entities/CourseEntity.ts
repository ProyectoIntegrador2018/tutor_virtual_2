import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Grade } from "./GradeEntity";
import { Season } from "./SeasonEntity";

@Entity({ name: "courses" })
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  topic: string;

  @Column()
  duration: number;

  @Column()
  recognitionType: string;

  @Column()
  url: string;

  @Column({ unique: false })
  claveCurso: string;

  @Column({ type: "date" })
  startDate: string;

  @Column({ type: "date" })
  endDate: string;
  
  @ManyToOne(() => Season, (season) => season.courses) 
  season: Season;

  @OneToMany(() => Grade, (grade) => grade.course)
  grades: Grade[];
}
