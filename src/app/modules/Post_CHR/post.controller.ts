//Post Controller

import { Request, Response } from "express";
import { postService } from "./post.service";
import sendResponse from "../../utils/sendResponse";

const helpPostCreatorController = async (req: Request, res: Response) => {
    try {
        const newPostData = req.body;
        

        const newPost = await postService.postOperations.createPost(
            newPostData
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Post created successfully",
            data: newPost,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Failed to create post",
            data: error.message,
        });
    }
};
const helpPostUpdateController = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;
        const updatedPostData = req.body;
        const updatedPost = await postService.postOperations.updatePost(
            postId,
            updatedPostData
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Post updated successfully",
            data: updatedPost,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Failed to update post",
            data: error.message,
        });
    }
};
const helpPostDeleteController = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;
        const deletedPost = await postService.postOperations.deletePost(postId);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Post deleted successfully",
            data: deletedPost,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Failed to delete post",
            data: error.message,
        });
    }
};

const helpPostGetController = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;
        const post = await postService.postOperations.getPost(postId);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Post retrieved successfully",
            data: post,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Failed to retrieve post",
            data: error.message,
        });
    }
};
const helpPostSearchController = async (req: Request, res: Response) => {
    try {
        const searchQuery: string = req.query.q as string;
        const searchResults = await postService.postOperations.searchPosts(
            searchQuery
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
            message: "Failed to retrieve search results",
            data: error.message,
        });
    }
};
const helpPostGetByUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const userPosts = await postService.postOperations.getUserPosts(userId);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User's posts retrieved successfully",
            data: userPosts,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Failed to retrieve user's posts",
            data: error.message,
        });
    }
};

//Embeded comment controller

const helpPostCommentController = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;
        const commentText = req.body.comment;
        const newComment = await postService.commentOperations.addComment(
            postId,
            commentText
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Comment added successfully",
            data: newComment,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Failed to add comment",
            data: error.message,
        });
    }
};
const helpPostReplyController = async (req: Request, res: Response) => {
    try {
        const commentId = req.body.commentId;
        const replyText = req.body.reply;
        const userId = req.body.userId;
        const newReply = await postService.commentOperations.addReply(
            commentId,
            replyText
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Reply added successfully",
            data: newReply,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Failed to add reply",
            data: error.message,
        });
    }
};

export const postController = {
    postOperations: {
        createPost: helpPostCreatorController,
        updatePost: helpPostUpdateController,
        deletePost: helpPostDeleteController,
        getPost: helpPostGetController,
        searchPosts: helpPostSearchController,
        getUserPosts: helpPostGetByUserController,
        addComment: helpPostCommentController,
        addReply: helpPostReplyController,
    },
    commentOperations: {
        addComment: helpPostCommentController,
        addReply: helpPostReplyController,
    },
};
