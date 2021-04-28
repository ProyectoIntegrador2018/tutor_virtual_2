import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "allies" })
export class Ally {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  vanity_id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  contact?: string;
}