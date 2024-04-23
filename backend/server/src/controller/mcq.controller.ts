import { Request, Response } from "express";
import { Equal } from "typeorm";
import { AppDataSource } from "../database";
import { MCQEntity } from "../entity/MCQ.entity";
import { OptionsEntity } from "../entity/options.entity";

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
      const { email } = req.params;
      const mcq = await AppDataSource.getRepository(MCQEntity).find({
        where: {
          email: email,
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
      const { ques_id } = req.params;
      const parsedQuesId = parseInt(ques_id);
      const mcqToDelete = await AppDataSource.getRepository(MCQEntity).findOne({
        where: { ques_id: parsedQuesId },
      });

      if (!mcqToDelete) {
        return res.status(404).json({ message: "MCQ not found" });
      }

      await AppDataSource.getRepository(MCQEntity).remove(mcqToDelete);

      res.json({ message: "MCQ deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getMCQWithOptions(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const mcq = await AppDataSource.getRepository(MCQEntity).find({
        where: {
          email: email,
        },
      });

      const mcqWithOptions = await Promise.all(
        mcq.map(async (mcqItem) => {
          const options = await AppDataSource.getRepository(OptionsEntity).find(
            {
              where: {
                ques_id: Equal(mcqItem.ques_id),
              },
            }
          );
          return {
            ...mcqItem,
            options: options,
          };
        })
      );

      res.json(mcqWithOptions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new MCQController();
