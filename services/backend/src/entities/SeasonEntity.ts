import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "seasons" })
export class Season {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  starting: string;

  @Column({ type: "date" })
  ending: string;
}
