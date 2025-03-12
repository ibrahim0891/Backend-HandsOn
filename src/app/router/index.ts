import Router from "express";
import { authRouter } from "../modules/Authentication/auth.router";
import { authMiddleware } from "../middleware/auth.middleware";
import sendResponse from "../utils/sendResponse";
import { userRouter } from "../modules/user/user.router";
import { eventRotuer } from "../modules/Event/events.router";
import { postRouter } from "../modules/Post_CHR/post.router";

const router = Router();

const routers = [
    {
        path: "/user",
        isProtected: true,
        router: userRouter,
    },
    {
        path: "/post",
        isProtected: true,
        router: postRouter,
    },
    {
        path: "/events",
        isProtected: true,
        router: eventRotuer,
    },
    {
        path: "/auth",
        isProtected: false,
        router: authRouter,
    },
];

//user this router later
routers.forEach((route, index) => {
    if (route.isProtected) {
        router.use(route.path, authMiddleware as any, route.router as any);
    } else {
        router.use(route.path, route.router as any);
    }
});

export default router;
