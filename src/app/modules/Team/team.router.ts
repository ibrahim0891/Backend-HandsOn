import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { teamController } from "./team.controller";
import RequestHandler from 'express'; 
import { teamPostService } from "./modules/team.post.services";
import { teamEventService } from "./modules/team.events.service";





const router = express.Router();
router.post("/create", authMiddleware, teamController.createTeam);
router.post("/invite", authMiddleware, teamController.inviteUsersToTeam);
router.post("/join", authMiddleware, teamController.joinTeam);
router.post("/leave", authMiddleware, teamController.leaveTeam);
router.delete("/invitation", authMiddleware, teamController.deleteInvitation);

// Team Event Routes
router.post("/event/create", authMiddleware, teamEventService.createEventByTeam);
router.post("/event/join", authMiddleware, teamEventService.joinEventByTeam);
router.get("/event/search", authMiddleware, teamEventService.eventSearchByTeam);
router.get("/event/feed", authMiddleware, teamEventService.eventFeedByTeam);
router.get("/event/filter", authMiddleware, teamEventService.eventFilterByTeam);

// Team Help Post Routes
router.post("/help/create", authMiddleware, teamPostService.createPostByTeam);
router.put("/help/update", authMiddleware, teamPostService.updatePostByTeam);
router.delete("/help/delete", authMiddleware, teamPostService.deletePostByTeam);
router.get("/help/get", authMiddleware, teamPostService.getPostByTeam);
router.get("/help/search", authMiddleware, teamPostService.searchPostByTeam);
router.get("/help/user", authMiddleware, teamPostService.getPostByUserByTeam);

export const teamRouter = router;
