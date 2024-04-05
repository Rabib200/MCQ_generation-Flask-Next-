import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "options_entity" })
export class OptionsEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "jsonb", nullable: true })
  options: any;

  // @ManyToOne(() => MCQEntity, (mcq) => mcq.ques_id)
  // ques_id: MCQEntity;
  @Column({ type: "bigint", nullable: true })
  ques_id: number;
}
