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
        const userId = req.user.user._id;

        const result = await eventService.eventCreationService(
            eventData,
            userId
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
    try {
        const { userId, eventId } = req.body;
        const result = await eventService.eventJoinerService(userId, eventId);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Event joined successfully",
            data: result,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Event joining failed",
            data: error.message,
        });
    }
};

const eventFeedController = async (req: Request, res: Response) => {
    //filter and show events vased on category , location and availablity
    //replace the location source later
    try {
        const userLoaction = req.user.user.location.city;
        const result = await eventService.eventFeedService({
            location: userLoaction,
            category: req.body.category,
        });
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Event listing successful",
            data: result,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Event listing failed successfully :P", // Joking btw :)
            data: error,
        });
    }
};
const eventFilterController = async (req: Request, res: Response) => {
    try {
        const filterQuery = req.query;
        console.log(filterQuery);
        const result = await eventService.eventFilterService(filterQuery);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Event filtering successful",
            data: result,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Event filtering failed ", // Joking btw :)
            data: error,
        });
    }
};

const eventSearchController = async (req: Request, res: Response) => {
    try {
        const result = await eventService.eventSearchService(
            req.body.searchQuery
        );
        result.length > 0
            ? sendResponse(res, {
                  statusCode: 200,
                  success: true,
                  message: "Event search successful",
                  data: result,
              })
            : sendResponse(res, {
                  statusCode: 400,
                  success: false,
                  message: "Event search failed",
                  data: "No event found",
              });
    } catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Event search failed",
            data: error,
        });
    }
};
export const eventController = {
    eventCreatorController,
    eventFeedController,
    eventFilterController,
    eventJoinerController,
    eventSearchController,
};
