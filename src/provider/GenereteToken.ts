const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");

interface IGenereteToken {
  userId: string;
}

class GenerateToken {
  async execute({ userId }: IGenereteToken) {
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(userId),
      expiresIn,
    });

    return token;
  }
}

module.exports = GenerateToken;
