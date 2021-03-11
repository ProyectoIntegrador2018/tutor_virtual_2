import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  paternalName: string;

  @Column()
  maternalName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // TODO: Add Role Relation
}
