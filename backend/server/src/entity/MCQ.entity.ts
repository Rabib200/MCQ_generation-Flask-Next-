import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { McqOptions } from "./options.entity";

@Entity()
export class MCQEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  index: number;

  @Column({
    type: "text",
  })
  question: string;

  @Column({
    type: "text",
  })
  answer: string;

  @OneToMany(() => McqOptions, (options) => options.question)
  options: McqOptions[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
