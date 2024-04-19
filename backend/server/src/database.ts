import "reflect-metadata";
import { DataSource } from "typeorm";
import { MCQEntity } from "./entity/MCQ.entity";
import { OptionsEntity } from "./entity/options.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "adaptive",

  synchronize: true,
  logging: false,
  entities: [MCQEntity, OptionsEntity],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});
