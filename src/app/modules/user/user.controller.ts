import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import userService from "./user.service";
import { Document } from "mongoose";

const userUpdateController = async (
    req: Request & { user: { _id: string } },
    res: Response
) => {
    try {
        const result: Document = await userService.userUpdateService({
            updatedUser: req.body,
            userId: req.user.user._id,
        });
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User profile updated successfully",
            data: result,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Something went wrong while updating user profile",
            data: error,
        });
    }
};

const getUserController = async (
    req: Request & { user: { _id: string } },
    res: Response
) => {
    try {
        const result: Document = await userService.userGetterService(
            req.user.user._id
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User profile fetched successfully",
            data: result,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Something went wrong while fetching user profile",
            data: error,
        });
    }
};

const getUserByIdController = async (
    req: Request & { user: { _id: string } },
    res: Response
) => {
    try {
        const result: Document = await userService.userGetterService(
            req.params.id
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User profile fetched successfully",
            data: result,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Something went wrong while fetching user profile",
            data: error,
        });
    }
};
const userController = {
    userUpdateController,
    getUserController,
    getUserByIdController,
};
export default userController;
