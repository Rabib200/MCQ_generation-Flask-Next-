import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "mcq_entity" })
export class MCQEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string | null;

  @Column({ nullable: true })
  question: string | null;

  @Column({ nullable: true })
  answer: string | null;

  @Column({ name: "ques_id", nullable: true })
  ques_id: number | null;
}
