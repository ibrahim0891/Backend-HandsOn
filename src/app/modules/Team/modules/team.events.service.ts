import { PrivetEvents } from "../../Event/events.model";
import TeamModel from "../team.model";
import Event from "../../Event/events.model";

const createEventByTeamService = async (teamId, eventData) => {
    try {
        const team = await TeamModel.findById(teamId);
        if (!team) {
            throw new Error("Team not found");
        }
        const EventModel =
            team.membershipType === "public" ? Event : PrivetEvents;
        const newEvent = await EventModel.create({ ...eventData, teamId });
        team.events.push(newEvent._id);
        await team.save();
        return newEvent;
    } catch (error) {
        throw new Error(error + ": Failed to create event by team");
    }
};

const joinEventByTeamService = async (teamId, eventId, userId) => {
    try {
        const team = await TeamModel.findById(teamId);
        if (!team) {
            throw new Error("Team not found");
        }
        const EventModel =
            team.membershipType === "public" ? Event : PrivetEvents;
        const event = await EventModel.findById(eventId);
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
        await User.findByIdAndUpdate(
            userId,
            { $inc: { "contributions.eventParticipated": 1 } },
            { new: true }
        );
        await event.save();
        return event;
    } catch (error) {
        throw new Error(error + ": Failed to join event by team");
    }
};

const eveentSearchByTeamService = async (teamId, searchQuery: string) => {
    try {
        const team = await TeamModel.findById(teamId);
        const EventModel =
            team.membershipType === "public" ? Event : PrivetEvents;
        const events = await EventModel.find({
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

const eventFeedByTeamService = async (
    teamId,
    filters: {
        category?: string[];
        location?: string;
    }
) => {
    try {
        const team = await TeamModel.findById(teamId);
        const EventModel =
            team.membershipType === "public" ? Event : PrivetEvents;
        let query = { teamId, isEventAvailable: true, ...filters };
        const events = await EventModel.find(query);
        return events;
    } catch (error) {
        throw new Error("Event feed not retrived successfull!");
    }
};

const eventFilterByTeamService = async (
    teamId,
    filterQuery: {
        location: string;
        category: string;
        isEventAvailable: boolean;
    }
) => {
    try {
        const team = await TeamModel.findById(teamId);
        const EventModel =
            team.membershipType === "public" ? Event : PrivetEvents;
        const events = await EventModel.find({ teamId, ...filterQuery });
        return events;
    } catch (error) {
        throw new Error("Event filter failed");
    }
};

export const teamEventService = {
    createEventByTeam: createEventByTeamService,
    joinEventByTeam: joinEventByTeamService,
    eventSearchByTeam: eveentSearchByTeamService,
    eventFeedByTeam: eventFeedByTeamService,
    eventFilterByTeam: eventFilterByTeamService,
};
