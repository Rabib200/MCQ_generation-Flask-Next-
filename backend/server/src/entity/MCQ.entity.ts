import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "mcq_entity" })
export class MCQEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column({ name: "ques_id" })
  ques_id: number;

  @Column({ name: "context" })
  context: string;
}
