// 1.Event creation - done
// 1.Event Listing and Filter
// 3.Join Event

import { Request, Response } from "express";
import IEvent from "./events.interface";
import Event from "./events.model";
import User from "../user/user.model";

const eventCreationService = async (
    eventInitiatorData: IEvent,
    creatorId: string,
) => {
    try {
        const event = await Event.create({ ...eventInitiatorData, creatorId });
        
        // Update creator's contributions in a single atomic operation
        await User.findByIdAndUpdate(
            creatorId,
            {
                $inc: { 'contributions.eventOrganised': 1 },
                $addToSet: { 'contributions.causesContributed': eventInitiatorData.category }
            },
            { new: true }
        );

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
        await User.findByIdAndUpdate(
            userId,
            { $inc: { "contributions.eventParticipated": 1 } },
            { new: true }
        );

        return event;
    } catch (error) {
        throw new Error("Event joining failed " + error.message);
    }
};

const eventFeedService = async (filters: {
    category?: string[];
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
const eventFilterService = async (filterQuery: {
    location: string;
    category: string;
    isEventAvailable: boolean;
}) => {
    try {
        const events = await Event.find(filterQuery);
        return events;
    } catch (error) {
        throw new Error("Event filter failed");
    }
};

const eventSearchService = async (searchQuery: string) => {
    try {
        const events = await Event.find({
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { description: { $regex: searchQuery, $options: "i" } },
            ],
        });
        return events;
    } catch (error) {
        throw new Error("Event search failed");
    }
};

export const eventService = {
    eventCreationService,
    eventFeedService,
    eventFilterService,
    eventJoinerService,
    eventSearchService,
};
