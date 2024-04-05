import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { OptionsEntity } from "../entity/options.entity";

class OptionsController {
  async getOptions(req: Request, res: Response) {
    try {
      const options = await AppDataSource.getRepository(OptionsEntity).find();
      res.json(options);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createOptions(req: Request, res: Response) {
    try {
      const options = await AppDataSource.getRepository(OptionsEntity).create(
        req.body
      );
      await AppDataSource.getRepository(OptionsEntity).save(options);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new OptionsController();
