import nodemailer from "nodemailer";
import config from "../config";
import { IMailOptions } from "../constant";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email_user,
        pass: config.email_pass,
    },
});

const sendMail = async ({ to, subject, message }: IMailOptions) => {
    const mailOptions = {
        from: "nijhum0891@gmail.com",
        to,
        subject,
        text: message,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.log(error);
    }
};

export default sendMail;
