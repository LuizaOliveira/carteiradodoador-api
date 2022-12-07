const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");

class GenerateToken {
  async execute(userId: string) {
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: userId.toString(),
      expiresIn,
    });

    return token;
  }
}

module.exports = GenerateToken;
