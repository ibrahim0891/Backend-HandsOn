import express, { RequestHandler, RequestParamHandler } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { postController } from "./post.controller";

const router = express.Router();

router.post(
    "/create",
    authMiddleware as RequestHandler,
    postController.postOperations.createPost
);

router.put(
    "/update/:postId",
    authMiddleware as RequestHandler,
    postController.postOperations.updatePost
);

router.delete(
    "/delete/:postId",
    authMiddleware as RequestHandler,
    postController.postOperations.deletePost
);

router.get(
    "/get/:postId",
    authMiddleware as RequestHandler,
    postController.postOperations.getPost
);

router.get(
    "/search",
    authMiddleware as RequestHandler,
    postController.postOperations.searchPosts
);

router.get(
    "/get/user/:userId",
    authMiddleware as RequestHandler,
    postController.postOperations.getUserPosts
);

router.post(
    "/comment/:postId",
    authMiddleware as RequestHandler,
    postController.commentOperations.addComment
);

router.post(
    "/reply/:commentId",
    authMiddleware as RequestHandler,
    postController.commentOperations.addReply
);

export const postRouter = router;
