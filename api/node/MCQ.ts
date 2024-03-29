import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.status(200).json({ message: "CORS preflight request successful" });
    return;
  }

  // Set CORS headers for actual requests
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_ORIGIN || "*"
  ); // Replace with your frontend origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "POST") {
    try {
      const { paragraph, index, question, answer, options } = req.body;
      const email = "rabib200@gmail.com";
      const addMCQHandler = await prisma.mCQ.create({
        data: {
          email,
          index,
          paragraph,
          question,
          answer,
          options,
        },
      });

      res.status(201).json(addMCQHandler);
    } catch (error) {
      res.status(400).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { index } = req.query;

      const deleteMCQ = await prisma.mCQ.delete({
        where: {
          index: index,
        },
      });
      res.status(200).json(deleteMCQ);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5,
};
