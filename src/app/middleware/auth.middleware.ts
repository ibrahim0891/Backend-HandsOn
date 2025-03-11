import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import sendResponse from "../utils/sendResponse";

export const authMiddleware = (
    req: Request & { user: any },
    res: Response,
    next: NextFunction
) => {
    const authToken = req.cookies.token;
    if (!authToken) {
        sendResponse(res, {
            statusCode: 401,
            success: false,
            message: "Unauthorizedi",
            data: null,
        });
    }
    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string);
        req.user = decoded;
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
