import cors from "cors";
import dotnev from "dotenv";
import express from "express";
import morganBody from "morgan-body";
import { AppDataSource } from "./database";
import mcqRouter from "./routes/mcq.route";
import optionsRouter from "./routes/options.route";
dotnev.config();

async function bootstrap() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(express.json());

  // Logger
  morganBody(app);

  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to the database", error);
  }

  app.use("/api/mcq", mcqRouter);
  app.use("/api/options", optionsRouter);

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}

bootstrap();
