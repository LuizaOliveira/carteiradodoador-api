import { client } from "../prisma/client";
import { Request, Response } from "express";

class BloodTypeController {

  async execute(request: Request, response: Response) {
    const bloodType = await client.bloodType.findMany({
      select : {
        id: true,
        type: true,
        rhFactor: true,
      }
    })
    return response.json(bloodType)  
  }

  async select(request: Request, response: Response) {
    const donorId = request.params.id;

    const bloodType = await client.bloodType.findFirst({
      select: {
        type: true,
        rhFactor: true,
      },
      where: {
        donor: {
          some: {
            id: donorId,
          },
        },
      },
    });
    return response.json(bloodType);
  }
}

export { BloodTypeController };

