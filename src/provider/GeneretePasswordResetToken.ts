import dayjs from "dayjs";
import { client } from "../prisma/client";
const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");

class GeneratePasswordResetToken {
  async execute(donorId: string) {
    const { secret } = authConfig.jwt;
    const expiresIn = dayjs().add(1, "hour").unix();

    const token = sign({}, secret, {
      subject: donorId.toString(),
      expiresIn: 3600
    });

    try {
      const passwordResetToken = await client.resetPassword.create({
        data: {
          donorId,
          expiresIn,
        },
      });
      // console.log({ passwordResetToken, token })
      return { passwordResetToken, token };

    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = GeneratePasswordResetToken;
