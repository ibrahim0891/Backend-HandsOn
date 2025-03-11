// 1.Event creation - done
// 1.Event Listing and Filter
// 3.Join Event

import { Request, Response } from "express";
import IEvent from "./events.interface";
import Event from "./events.model";

const eventCreationService = async (
    eventInitiatorData: IEvent,
    creatorId: string
) => {
    try {
        console.log(eventInitiatorData);
        const event = await Event.create({ ...eventInitiatorData, creatorId });
        return event;
    } catch (error) {
        throw new Error("Event creation failed");
    }
};
const eventJoinerService = async (userId: string, eventId: string) => {
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error("Event not found");
        }
        if (event.attendees.includes(userId)) {
            throw new Error("User already joined the event");
        }
        if (event.isEventAvailable === false) {
            throw new Error("Event is not available");
        }
        event.attendees.push(userId);
        await event.save();
        return event;
    } catch (error) {
        throw new Error("Event joining failed");
    }
};

const eventFeedService = async (filters: {
    category?: string;
    location?: string;
}) => {
    try {
        let query = { isEventAvailable: true, ...filters };
        const events = await Event.find(query);
        return events;
    } catch (error) {
        throw new Error("Event feed not retrived successfull!");
    }
};
const eventFilterService = async () => {};

export const eventService = {
    eventCreationService,
    eventFeedService,
    eventFilterService,
    eventJoinerService,
};
