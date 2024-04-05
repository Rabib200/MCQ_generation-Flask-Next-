import "reflect-metadata";
import { DataSource } from "typeorm";
import { MCQEntity } from "./entity/MCQ.entity";
import { OptionsEntity } from "./entity/options.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://postgres.dyderyvoyxrxpaeircsl:Y8IuF2wjsSdzYE2B@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres",
  synchronize: true,
  logging: false,
  entities: [MCQEntity, OptionsEntity],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});
