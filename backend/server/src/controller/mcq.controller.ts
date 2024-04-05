import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { MCQEntity } from "../entity/MCQ.entity";

class MCQController {
  async getMCQs(req: Request, res: Response) {
    try {
      const mcqs = await AppDataSource.getRepository(MCQEntity).find();
      res.json(mcqs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getMCQ(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const mcq = await AppDataSource.getRepository(MCQEntity).findOne({
        where: {
          ques_id: +id,
        },
      });

      res.json(mcq);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createMCQ(req: Request, res: Response) {
    try {
      const mcq = AppDataSource.getRepository(MCQEntity).create(req.body);

      await AppDataSource.getRepository(MCQEntity).save(mcq);
      res.json(mcq);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // updateMCQ(req: Request, res: Response) {}

  async deleteMCQ(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await AppDataSource.getRepository(MCQEntity).delete(id);
      res.json({ message: "MCQ deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new MCQController();
