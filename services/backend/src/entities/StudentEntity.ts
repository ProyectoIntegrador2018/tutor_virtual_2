import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Ally } from "./AllyEntity";
import { Grade } from "./GradeEntity";

@Entity({ name: "students" })
export class Student {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  paternal_name: string;

  @Column()
  maternal_name: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Ally, (ally) => ally.students)
  ally: Ally;

  @OneToMany(() => Grade, (grade) => grade.course)
  grades: Grade[];
}
