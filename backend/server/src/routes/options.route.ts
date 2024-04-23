import express from "express";
import OptionsController from "../controller/options.controller";

const optionsRouter = express.Router();

optionsRouter.get("/:ques_id", OptionsController.getOptions);
optionsRouter.post("/", OptionsController.createOptions);
optionsRouter.put("/", OptionsController.updateOptions);
optionsRouter.delete("/:ques_id", OptionsController.deleteOptions);

export default optionsRouter;
