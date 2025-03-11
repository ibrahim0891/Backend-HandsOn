import { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import jwt from "jsonwebtoken";
import config from "../../config";
import sendMail from "../../utils/mailer";
import createOTP from "../../utils/otp.generator";
import User from "../user/user.model";

 
const LoginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await authService.LoginService({ email, password });
        if (!user) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Invalid email or password",
                data: null,
            });
        }
        jwt.sign(
            {user},
            config.jwt_secret,
            (err: Error | null, token: string | undefined) => {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .json({ message: "Error generating token" });
                }
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict",
                });
                sendResponse(res, {
                    statusCode: 200,
                    success: true,
                    message: "Login successful",
                    data: {user},
                });
            }
        );
    } catch (err) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Error: " + err,
            data: err,
        });
    }
};

const SignUpController = async (req: Request, res: Response) => {
    const { email } = req.body;
    const otp = createOTP(6);
    const user = await User.findOne({ email })
    if (user) {
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "User already exists",
            data: null,
        });
    }
    jwt.sign(
        { email, otp },
        config.jwt_secret,
        {
            expiresIn: "10m",
        },
        (err: Error | null, token: string | undefined) => {
            if (err) {
                console.error(err);
                return sendResponse(res, {
                    statusCode: 500,
                    success: false,
                    message: "Server error: Something went wrong",
                    data: null,
                });
            }
            sendMail(
                config.email_config(email, { otp: otp, userName: "John Doe" })
            );

            res.cookie("otpToken", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            });

            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "Verification mail sent",
                data: null,
            });
        }
    );
};

const verificationController = async (req: Request, res: Response) => {
    const otpToken = req.cookies.otpToken;
    const userData = req.body;
    try {
        jwt.verify(
            otpToken,
            config.jwt_secret,
            async (err: Error | null, decoded: any) => {
                if (err) {
                    return sendResponse(res, {
                        statusCode: 401,
                        success: false,
                        message: "Invalid OTP " + err,
                        data: null,
                    });
                } else {
                    if (
                        decoded.otp == userData.otp &&
                        decoded.email == userData.email
                    ) {
                        userData.otp = undefined;
                        userData.isEmailVerified = true;
                        //pass the user data to the service layer to save
                        await authService.SignUService(userData); 
                        sendResponse(res, {
                            data: decoded,
                            statusCode: 200,
                            message: "OTP Verified",
                            success: true,
                        });
                    } else {
                        sendResponse(res, {
                            statusCode: 401,
                            success: false,
                            message: "Invalid OTP",
                            data: null,
                        });
                    }
                }
            }
        );
    } catch (err) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "There is an error in verification",
            data: err,
        });
    }
};

const sessionVerificationController = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) {
        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: "Unauthorized",
            data: null,
        });
    }
    jwt.verify(token, config.jwt_secret, (err: Error | null, decoded: any) => {
        if (err) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "Unauthorized",
                data: null,
            });
        } else {
            decoded.password = undefined;
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "Authorized",
                data: decoded,
            });
        }
    });
};

const LogoutController = async (req: Request, res: Response) => {
    res.clearCookie("token");
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Logout successful",
        data: null,
    });
};

export const authController = {
    LoginController,
    LogoutController,
    SignUpController,
    verificationController,
    sessionVerificationController,
};
