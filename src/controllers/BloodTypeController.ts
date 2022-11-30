import { client } from "../prisma/client";
import { Request, Response } from "express";

class BloodTypeController {
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
    console.log(bloodType)
    return response.json(bloodType);
  }
}

export { BloodTypeController };

