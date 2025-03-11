 

import dotenv from "dotenv";
import path from "path";
import { IMailOptions } from "../constant"; 

dotenv.config({
    path: path.join(process.cwd(), ".env"),
});

export default {
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    otp_length: Number(process.env.OTP_LENGTH),
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
    jwt_secret: String(process.env.JWT_SECRET),
    jwt_expires_in: String(process.env.OTP_EXPIRES),
    gemini_api_key: String(process.env.GENMI_API_KEY),

    email_config: (
        UserEmail: string,
        payload: { otp: string; userName: string }
    ): IMailOptions => {
        return {
            to: UserEmail,
            subject: "OTP for email verification",
            message: `Dear ${payload.userName},\n\nYour OTP for email verification is: ${payload.otp}\n\nThis OTP will expire shortly. Please do not share this OTP with anyone.\n\nBest regards,\nThe Team`,
        };
    },
};
