import express from "express";
import cors from "cors";
import { Request, Response } from "express";

import { client } from "../prisma/client";

const { hash } = require("bcrypt");

export const userRouter = express.Router();
userRouter.use(cors({}));

interface IDonorRequest {
  name: string;
  email: string;
  password: string;
  gender: boolean;
  situation: boolean;
  birthday?: any;
  bloodTypeId: string;
}

class CreateUserControllers {
  async create(request: Request, response: Response) {
    let {
      name,
      email,
      password,
      gender,
      situation,
      birthday,
      bloodTypeId,
    }: IDonorRequest = request.body;


    const userAlreadyExists = await client.donor.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const hashedPassword = await hash(password, 10);
    try {
      const user = await client.donor.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          gender: gender,
          situation: situation,
          birthday: birthday,
          bloodTypeId: bloodTypeId,
        },
      });
      return response.json(user);

    } catch (err) {
      return response.json(err);
    }
  }

  async select(request: Request, response: Response) {
    const donorId = request.params.id;
    const doador = await client.donor.findFirst({
      select: {
        name: true,
        email: true,
        gender: true,
        situation: true,
        birthday: true,
      },
      where: {
        id: donorId,
      },
    });
    return response.status(201).json(doador);
  }

  async update(request: Request, response: Response) {
    const donorId = request.params.id;
    const { gender, situation, birthday, bloodTypeId }: IDonorRequest =
      request.body;

    const doador = await client.donor.update({
      where: {
        id: donorId,
      },
      data: {
        gender: gender,
        situation: situation,
        birthday: birthday,
        bloodTypeId: bloodTypeId,
      },
    });
    return response.status(200).json(doador);
  }
}

export { CreateUserControllers };
