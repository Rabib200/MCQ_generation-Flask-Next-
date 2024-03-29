import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column({
    type: "jsonb",
  })
  options: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
