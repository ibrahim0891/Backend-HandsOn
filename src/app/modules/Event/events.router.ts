// 1.Event creation - done 
// 1.Event Listing and Filter
// 3.Join Event

import { Router } from "express";
import { eventController } from "./events.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import invitationCheckMiddleware from "../../middleware/event.invitationCheck.middleware";

const router = Router();
router.post("/create", authMiddleware, eventController.eventCreatorController);
router.post("/join", authMiddleware, invitationCheckMiddleware, eventController.eventJoinerController);

router.get("/list", authMiddleware, eventController.eventFeedController);
router.get("/filter", authMiddleware, eventController.eventFilterController);
router.get("/search", authMiddleware, eventController.eventSearchController);

export const eventRotuer = router;
