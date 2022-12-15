import { client } from "../prisma/client"
const { hash } = require("bcrypt");
import { Request, Response } from "express";

import { transport } from "../modules/mailer"

const GeneratResetPassword = require("../provider/GeneretePasswordResetToken");
require('dotenv').config()


class ResetPasswordController {
    async forgotPassword(request: Request, response: Response) {
        const { email } = request.body;

        const userAlreadyExists = await client.donor.findFirst({
            where: {
                email,
            },
        });

        if (!userAlreadyExists) {
            throw new Error("User not Found")
        }

        await client.resetPassword.deleteMany({
            where: {
                donorId: userAlreadyExists.id,
            },
        });

        const generateResetPasswordToken = new GeneratResetPassword();
        const resetPassword = await generateResetPasswordToken.execute(userAlreadyExists.id)

        const resetPasswordId = await client.resetPassword.findFirst({
            where: {
                donorId: userAlreadyExists.id,
            },
        });
        const ip = '192.168.1.8:3000'
        const link = `http://${ip}/reset-password${userAlreadyExists.id}/${resetPasswordId?.id}`

        var mailOptions = {
            from: process.env.EMAIL,
            to: userAlreadyExists.email,
            subject: "Password Reset",
            text: link,
        };

        transport.sendMail(mailOptions, (err) =>  {
            if(err) {
                console.log(err)
                return
            }
            response.status(200).json("email enviado com sucesso!")
        })
        
    }

    async resetPasswordRender(request: Request, response: Response) {
        const donorId = request.params.id;
        console.log("oi")

        // const { password, confirmPassword } = request.body;
    }

    async resetPassword(request: Request, response: Response) {
        const donorId = request.params.id;
        const { password, confirmPassword } = request.body;

        if (password === confirmPassword) {
            const hashedPassword = await hash(password, 10);
            try {
                const doador = await client.donor.update({
                    where: {
                        id: donorId,
                    },
                    data: {
                        password: hashedPassword
                    },
                })
                return response.status(200).json({ password: doador.password })

            } catch (err) {
                console.log(err)
            }
        } else {
            throw new Error("Passwords do not match.")
        }

    }

}
export { ResetPasswordController }