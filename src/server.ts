import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { router } from "./routes";
import { error } from "console";

const app = express();

app.use(express.json());
app.use(cors({}));

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error.message === "User already exists." || error.message === "Email or password incorrect.") {
      response.status(400);
      return response.json({
        status: "error",
        menssage: error.message,
      });
    }
    if (error.message === "User not found." || error.message === "Refresh token invalid") {
      response.status(404);
      return response.json({
        status: "error",
        menssage: error.message,
      });
    }
  }
);

app.listen(3000, () => console.log("Sever is running on port 3000"));
