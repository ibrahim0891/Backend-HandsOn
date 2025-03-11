// 1.Event creation
// 1.Event Listing and Filter
// 3.Join Event

import { Request, Response } from "express";
import { eventService } from "./events.service";
import sendResponse from "../../utils/sendResponse";
import IEvent from "./events.interface";

const eventCreatorController = async (req: Request, res: Response) => {
    try {
        const eventData: IEvent = req.body;
        const result = await eventService.eventCreationService(
            eventData,
            req.user.user._id
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Event created successfully",
            data: result,
        });
    } catch (error: any | unknown) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Event creation failed",
            data: error.message,
        });
    }
};
const eventJoinerController = async (req: Request, res: Response) => {
    const { userId, eventId } = req.body;
    const result = await eventService.eventJoinerService(userId, eventId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Event joined successfully",
        data: result,
    });
};

const eventFeedController = async (req: Request, res: Response) => {
    //filter and show events vased on category , location and availablity
    const userLoaction = req.user.user.location.city;
    const result = await eventService.eventFeedService({
        location: userLoaction,
    });
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Event listing successful",
        data: result,
    });
};

const eventFilterController = async (req: Request, res: Response) => {
    const result = await eventService.eventFilterService(req.query);
    res.status(200).json(result);
};
export const eventController = {
    eventCreatorController,
    eventFeedController,
    eventFilterController,
    eventJoinerController,
};
