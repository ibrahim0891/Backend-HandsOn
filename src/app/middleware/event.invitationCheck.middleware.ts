import { Request  , Response , NextFunction } from "express";
import sendResponse from "../utils/sendResponse";
import Event from "../modules/Event/events.model";






const invitationCheckMiddleware = async (req: Request, res: Response, next: NextFunction)=> {
    const { eventId } = req.body;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error("Event not found");
        }
        if(event.inviteOnly && !event.invitedUsers.includes(req.user.user._id)){
            throw new Error("You are not invited to this event");
        }
        next();
    } catch (error : any ) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Event joining failed",
            data: error.message,
        }) 
    }

}

export default invitationCheckMiddleware;