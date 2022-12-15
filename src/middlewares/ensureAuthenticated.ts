import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const authConfig = require("../configs/auth");

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).json({
      message: "Token is missing",
    });
  }
  const [, token] = authToken.split(" ");
  try {
    verify(token, authConfig.jwt.secret);
    return next();
  } catch (err) {
    return response.status(401).json({
      message: "Token is invalid",
    });
  }
}

