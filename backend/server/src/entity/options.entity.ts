import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "options_entity" })
export class OptionsEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "json" })
  options: string[];

  @Column({ type: "bigint", nullable: true })
  ques_id: number;
}
