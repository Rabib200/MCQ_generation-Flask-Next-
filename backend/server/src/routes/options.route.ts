import express from "express";
import OptionsController from "../controller/options.controller";

const optionsRouter = express.Router();

optionsRouter.get("/", OptionsController.getOptions);
optionsRouter.post("/", OptionsController.createOptions);

export default optionsRouter;
