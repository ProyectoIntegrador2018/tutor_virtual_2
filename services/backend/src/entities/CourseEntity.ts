import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  seasonID: number;
}