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
  birthday: string;
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

    if (bloodTypeId === null) {
      bloodTypeId = "41809d68-9751-48f7-8534-0d20fb0a2f93";
    }
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
      console.log(user);

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
// userRouter.get("/register", async (request, response) => {
//   try {
//     const doador = await client.donor.findMany({
//       select: {
//         name: true,
//         email: true,
//         gender: true,
//         situation: true,
//         birthday: true,
//       },
//     });
//     return response.status(201).json(doador);
//   } catch (err) {}
// });

// userRouter.post("/register", async (request, response) => {
//   try {
//     // const body: any = request.body;

//     const { name, email, password, gender, situation, birthday, bloodTypeId } =
//       request.body;

//     if (!name || !email || !password) {
//       return response.status(400).send({ error: "Preencha todos os campos." });
//     }

//     const hashedPassword = await hash(password, 10);

//     const checkUserExists = await client.donor.findFirst({
//       where: {
//         email: email,
//       },
//     });
//     if (checkUserExists) {
//       return response
//         .status(400)
//         .send({ error: "Este e-mail já está em uso." });
//     }

//     const donor: IDonorRequest = await client.donor.create({
//       data: {
//         name: name,
//         email: email,
//         password: hashedPassword,
//         gender: gender,
//         situation: situation,
//         birthday: birthday,
//         bloodTypeId: bloodTypeId,
//       },
//     });
//     return response.status(201).json(donor);
//   } catch (err) {
//     return response.status(400).send({ error: "Registration failed" });
//   }
// });
// userRouter.post("/authenticate", async (request, response) => {
//   const { email, password } = request.body;
//   try {
//     const checkUserExists = await client.donor.findFirst({
//       select: {
//         id: true,
//         password: true,
//       },
//       where: {
//         email: email,
//       },
//     });

//     if (!checkUserExists) {
//       return response.status(400).send({ error: "User not found." });
//     }
//     if (!(await compare(password, checkUserExists?.password))) {
//       return response.status(400).send({ error: "Senha ou email invalido." });
//     }
//     return response.send("logou");
//     // console.log(checkUserExists?.id)
//     // const token = jwt.sign({id: checkUserExists?.id }, authConfig.secret, {
//     //     expiresIn: 86400
//     // })
//     // console.log(token)
//   } catch (err) {
//     return response.status(400).send({ error: "Registration failed" });
//   }
// });
