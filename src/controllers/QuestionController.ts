import { client } from "../prisma/client";
import { Request, Response } from "express";

class QuestionController {
  async execute(request: Request, response: Response) {
    try{
        const question = await client.question.findMany({
          select: {
            id: true,
            title: true,
            description: true,
            bannerUrl: true,
          },
        });
        return response.status(201).json(question);

    }catch(err) {
        console.log(err)
        return response.json()
    }
}
}
export { QuestionController };
