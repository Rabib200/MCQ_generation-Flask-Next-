import dotnev from "dotenv";
dotnev.config();
import express from "express";
import mcqRouter from "./routes/mcq.route";
import { AppDataSource } from "./database";
import cors from "cors";
import morganBody from "morgan-body";

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

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}

bootstrap();
