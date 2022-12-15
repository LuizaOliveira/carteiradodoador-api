import nodemailer from "nodemailer"
require('dotenv').config()

const { host,  service, secure } = require("../configs/mail.json")

var transport = nodemailer.createTransport({
    host,
    service,
    secure,
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD 
    },
    tls: {
        rejectUnauthorized: false
    }
});

export { transport }