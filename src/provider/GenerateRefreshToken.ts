import dayjs from "dayjs";
import { client } from "../prisma/client";


class GenerateRefreshToken {
  async execute(donorId: string) {
    try {
      
      const expiresIn = dayjs().add(15, "second").unix();
      const generateRefreshToken = await client.refreshToken.create({
        data: {
          donorId,
          expiresIn,
        },
      });

      console.log(generateRefreshToken)
      return generateRefreshToken;

    }catch(err) {
      console.log(err)
    }
  }

}

module.exports = GenerateRefreshToken;
