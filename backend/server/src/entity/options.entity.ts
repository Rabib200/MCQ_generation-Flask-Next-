import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MCQEntity } from "./MCQ.entity";

@Entity()
export class McqOptions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option: string;

  @Column()
  isCorrect: boolean;

  @Column()
  questionId: number;

  @ManyToOne(() => MCQEntity, (mcq) => mcq.options)
  @JoinColumn({ name: "questionId" })
  question: MCQEntity;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
