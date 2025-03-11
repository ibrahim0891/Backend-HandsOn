import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";  
import userController from "./user.controller";
const router = Router();


router.post("/update-profile", authMiddleware, userController.userUpdateController);
router.get("/get-user-profile", authMiddleware, userController.getUserController);
router.get("get-user/:id", authMiddleware, userController.getUserByIdController);

//we can add more routes here like get all user , search user , filter user ,delete , etc 
//  but this is a MVP , so we can skip them for now .

export const userRouter = router;
