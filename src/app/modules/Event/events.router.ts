// 1.Event creation - done 
// 1.Event Listing and Filter
// 3.Join Event

import { Router } from "express";
import { eventController } from "./events.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/create",authMiddleware,  eventController.eventCreatorController);
router.post("/join", authMiddleware , eventController.eventJoinerController);

router.get("/list",authMiddleware ,  eventController.eventListGetterController);
router.get("/filter",authMiddleware , eventController.eventFilterController);


export const eventRotuer = router;
