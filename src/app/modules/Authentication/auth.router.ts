import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login", authController.LoginController);
router.post("/logout", authController.LogoutController);
router.post("/signup", authController.SignUpController); 
router.post("/verify-email", authController.verificationController);

router.get('/session' , authController.sessionVerificationController)

export const authRouter = router;
