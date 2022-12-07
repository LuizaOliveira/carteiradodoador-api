import express, { response } from "express";
import cors from "cors";

import { Request, Response } from "express";
const { compare } = require("bcrypt");

const GenerateToken = require("../provider/GenereteToken");
const GenerateRefreshToken = require("../provider/GenerateRefreshToken");

import { client } from "../prisma/client";

export const userRouter = express.Router();
userRouter.use(cors({}));

interface IUserRequest {
  email: string;
  password: string;
}

class SessionsController {
  async authenticate(request: Request, response: Response) {
    const { email, password }: IUserRequest = request.body;
    const userAlreadyExists = await client.donor.findFirst({
      where: {
        email: email,
      },
    });

    if (!userAlreadyExists) {
      throw new Error("User not found.");
    }
    if (!(await compare(password, userAlreadyExists?.password))) {
      throw new Error("Email or password incorrect.");
    }
    const generateTokenProvider = new GenerateToken();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    const generateRefreshToken = new GenerateRefreshToken();

    await client.refreshToken.deleteMany({
      where: {
        donorId: userAlreadyExists.id,
      },
    });
    
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    );

    response.status(201).json({ userAlreadyExists, token, refreshToken });
  }

}
export { SessionsController };
