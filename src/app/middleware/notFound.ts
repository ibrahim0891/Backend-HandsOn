import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (
    req: Request,
    res: Record<string, any>,
    next: NextFunction
) => {
    return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API Not Found !!",
        error: "",
    });
};

export default notFound;
