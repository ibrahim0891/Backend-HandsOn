import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { teamService } from "./team.service";

const teamCreateController = async (req, res) => {
    try {
        const newTeamData = req.body;
        const newTeam = await teamService.createTeam(newTeamData);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Team created successfully  ",
            data: newTeam,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const teamInvitationController = async (req: Request, res: Response) => {
    try {
        const invitedUsers = req.body.invitedUsers;
        const teamId = req.params.teamId;
        const team = await teamService.inviteUsersToTeam(teamId, invitedUsers);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Users invited to the team successfully",
            data: team,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const teamJoinController = async (req: Request, res: Response) => {
    try {
        const teamId = req.params.teamId;
        const userId = req.body.userId;
        const team = await teamService.joinTeam(teamId, userId);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User joined the team successfully",
            data: team,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const deleteInvitationController = async (req: Request, res: Response) => {
    try {
        const teamId = req.params.teamId;
        const userId = req.body.userId;
        const team = await teamService.deleteInvitation(teamId, userId);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User invitation deleted successfully",
            data: team,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const teamLeaveController = async (req: Request, res: Response) => {
    try {
        const teamId = req.params.teamId;
        const userId = req.body.userId;
        const team = await teamService.leaveTeam(teamId, userId);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User left the team successfully",
            data: team,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

//TEAM EVENT CONTROLLER
const teamEventService = teamService.teamEventService;

const createTeamEvent = async (req: Request, res: Response) => {
    try {
        const eventData = req.body;
        const teamId = req.params.teamId;
        const event = await teamEventService.createEventByTeam(
            teamId,
            eventData
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Team event created successfully",
            data: event,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const joinTeamEvent = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.body.userId;
        const teamId = req.body.teamId;
        const event = await teamEventService.joinEventByTeam(
            teamId,
            eventId,
            userId
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Joined team event successfully",
            data: event,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const searchTeamEvent = async (req: Request, res: Response) => {
    try {
        const searchQuery = req.query;
        const teamId = req.params.teamId;
        const events = await teamEventService.eventSearchByTeam(
            teamId,
            searchQuery
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Team events retrieved successfully",
            data: events,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const getTeamEventFeed = async (req: Request, res: Response) => {
    try {
        const teamId = req.params.teamId;
        const filters = {
            category: req.query.category,
            location: req.query.location,
        };
        const events = await teamEventService.eventFeedByTeam(teamId, filters);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Team event feed retrieved successfully",
            data: events,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const filterTeamEvents = async (req: Request, res: Response) => {
    try {
        const filterCriteria = req.body;
        const teamId = req.params.teamId;
        const events = await teamEventService.eventFilterByTeam(
            teamId,
            filterCriteria
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Filtered team events retrieved successfully",
            data: events,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const teamHelpPostService = teamService.teamPostService;
//teampost controller
const createHelpPost = async (req: Request, res: Response) => {
    try {
        const teamId = req.params.teamId;
        const newPost = await teamHelpPostService.createPostByTeam(
            teamId,
            req.body
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Help post created successfully",
            data: newPost,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const updateHelpPost = async (req: Request, res: Response) => {
    try {
        const { teamId, postId } = req.params;
        const updatedPost = await teamHelpPostService.updatePostByTeam(
            teamId,
            postId,
            req.body
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Help post updated successfully",
            data: updatedPost,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const deleteHelpPost = async (req: Request, res: Response) => {
    try {
        const { teamId, postId } = req.params;
        const deletedPost = await teamHelpPostService.deletePostByTeam(
            teamId,
            postId
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Help post deleted successfully",
            data: deletedPost,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const getHelpPost = async (req: Request, res: Response) => {
    try {
        const { teamId, postId } = req.params;
        const post = await teamHelpPostService.getPostByTeam(teamId, postId);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Help post retrieved successfully",
            data: post,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const searchHelpPosts = async (req: Request, res: Response) => {
    try {
        const teamId = req.params.teamId;
        const query = req.query.q as string;
        const searchResults = await teamHelpPostService.searchPostByTeam(
            teamId,
            query
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Search results retrieved successfully",
            data: searchResults,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

const getUserHelpPosts = async (req: Request, res: Response) => {
    try {
        const { teamId, userId } = req.params;
        const userPosts = await teamHelpPostService.getPostByUserByTeam(
            teamId,
            userId
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User's help posts retrieved successfully",
            data: userPosts,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: error.message,
        });
    }
};

export const teamController = {
    createTeam: teamCreateController,
    inviteUsersToTeam: teamInvitationController,
    joinTeam: teamJoinController,
    leaveTeam: teamLeaveController,
    deleteInvitation: deleteInvitationController,

    teamEventController : {
        createTeamEvent,
        joinTeamEvent,
        searchTeamEvent,
        getTeamEventFeed,
        filterTeamEvents
    }
    , 
    teamHelpPostController : {
        createHelpPost,
        updateHelpPost,
        deleteHelpPost,
        getHelpPost,
        searchHelpPosts,
        getUserHelpPosts
    } 
};