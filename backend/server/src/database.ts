import "reflect-metadata";
import { DataSource } from "typeorm";
import { MCQEntity } from "./entity/MCQ.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "",
  password: "",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [MCQEntity],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});
