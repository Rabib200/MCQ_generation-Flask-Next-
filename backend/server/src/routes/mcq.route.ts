import express from "express";
import mcqController from "../controller/mcq.controller";

const mcqRouter = express.Router();

// mcqRouter.get("/", mcqController.getMCQs);
mcqRouter.get("/:email", mcqController.getMCQWithOptions);
mcqRouter.post("/", mcqController.createMCQ);
// mcqRouter.put("/:id", mcqController.updateMCQ);
mcqRouter.delete("/:ques_id", mcqController.deleteMCQ);

export default mcqRouter;
