import { client } from "../prisma/client";
import { Request, Response } from "express";
import dayjs from "dayjs";

const GenerateToken = require("../provider/GenereteToken");
const GenerateRefreshToken = require("../provider/GenerateRefreshToken");

class UserRefreshToken {
  async execute(request: Request, response: Response) {
    const refresh_token = request.body;
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token.refresh_token,
      },
    });
    if (!refreshToken) {
      throw new Error("Reset password token invalid");
    }
    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    const generateToken = new GenerateToken();
    const token = await generateToken.execute(refreshToken.id);

    if (refreshTokenExpired) {
      try {
        await client.refreshToken.deleteMany({
          where: {
            donorId: refreshToken.donorId,
          },
        });
        const generateRefreshToken = new GenerateRefreshToken();
        const newRefreshToken = await generateRefreshToken.execute(refreshToken.donorId);

        return response.json({token, newRefreshToken})

      } catch (err) {
        console.log(err)
      }

    }

    return response.json({ token })
  }

}
export { UserRefreshToken };
