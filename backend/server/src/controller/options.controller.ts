import { Request, Response } from "express";
import { Equal } from "typeorm";
import { AppDataSource } from "../database";
import { OptionsEntity } from "../entity/options.entity";

class OptionsController {
  async getOptions(req: Request, res: Response) {
    const { ques_id } = req.params;
    const parsedQuesId = parseInt(ques_id);
    try {
      const options = await AppDataSource.getRepository(OptionsEntity).find({
        where: {
          ques_id: Equal(parsedQuesId),
        },
      });
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

  async updateOptions(req: Request, res: Response) {
    try {
      const { options, ques_id } = req.body;

      const option = await AppDataSource.getRepository(OptionsEntity).findOne({
        where: { ques_id },
      });

      if (!option) {
        return res.status(404).json({ message: "Options not found" });
      }

      option.options.sort(() => Math.random() - 0.5);
      option.options.push(...options);

      res.status(200).json(option);
      await AppDataSource.getRepository(OptionsEntity).save(option);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // async updateOptions(req: Request, res: Response) {
  //   try {
  //     const { options, ques_id } = req.body;

  //     const optionsRepository = AppDataSource.getRepository(OptionsEntity); // Get repository
  //     const existingOptions = await optionsRepository.findOne({
  //       where: { ques_id },
  //     });

  //     if (!existingOptions) {
  //       return res.status(404).json({ message: "Options not found" });
  //     }

  //     existingOptions.options = options; // Replace options directly

  //     await optionsRepository.save(existingOptions); // Save the updated entity

  //     res.status(200).json(existingOptions); // Return the updated options
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  async deleteOptions(req: Request, res: Response) {
    try {
      const { ques_id } = req.params;
      const parsedQuesId = parseInt(ques_id);
      console.log(parsedQuesId);

      const option = await AppDataSource.getRepository(OptionsEntity).findOne({
        where: { ques_id: parsedQuesId },
      });

      if (!option) {
        return res.status(404).json({ message: "Options not found" });
      }
      if (!option.options || option.options.length === 0) {
        return res
          .status(400)
          .json({ message: "Options array is empty or null" });
      }

      const poppedOption = option.options.pop();

      await AppDataSource.getRepository(OptionsEntity).save(option);

      res.status(200).json({ message: "Options deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new OptionsController();
