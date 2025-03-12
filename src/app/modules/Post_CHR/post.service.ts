//Post service

import { HelpPost } from "./post.model";
import { CommentModel } from "./post.model";

interface Ipost {
    title: string;
    description: string;
    urgencyLevel: string;
    userId: string;
}

const helpPostCreatorService = async (newPostData: Ipost) => {
    try {
        const newPost = await HelpPost.create(newPostData);
        return newPost;
    } catch (error) {
        throw new Error("Failed to create post");
    }
};
const helpPostUpdateService = async (
    postId: string,
    updatedPostData: Ipost
) => {
    try {
        const updatedPost = await HelpPost.findByIdAndUpdate(
            postId,
            updatedPostData,
            { new: true }
        );
        return updatedPost;
    } catch (error) {
        throw new Error("Failed to update post");
    }
};

const helpPostDeleteService = async (postId: string) => {
    try {
        const deletedPost = await HelpPost.findByIdAndDelete(postId);
        return deletedPost;
    } catch (error) {
        throw new Error("Failed to delete post");
    }
};

const helpPostGetService = async (postId: string) => {
    try {
        const post = await HelpPost.findById(postId);
        return post;
    } catch (error) {
        throw new Error("Failed to retrieve post");
    }
};
const helpPostSearchService = async (q: string) => {
    try {
        const searchResults = await HelpPost.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
            ],
        });
        return searchResults;
    } catch (error) {
        throw new Error("Failed to retrieve search results");
    }
};
const helpPostGetByUserService = async (userId: string) => {
    try {
        const userPosts = await HelpPost.find({ userId });
        return userPosts;
    } catch (error) {
        throw new Error("Failed to retrieve user's posts");
    }
};

//Embeded comment service

const helpPostCommentService = async (
    postId : string , 
    userId: string,
    commentText : string
) => {
    const post = await HelpPost.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    }
     
    const comment = await CommentModel.create({
        text: commentText,
        user: userId,
    });
    post.comments.push(comment);
    await post.save();
    await comment.save();
    return post;
};
const helpPostReplyService = async ( 
    userId: string,
    commentId: string,
    replyText: string
) => {  

    try {
        const comment = await CommentModel.findById(commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }
        const reply = {
            replyText : replyText,
            userId : userId,
        }
        comment.replies.push(reply);
        await comment.save();
        return comment;
    } catch (error) {
        throw new Error("Failed to add reply");
    }
};

export const postService = {
    postOperations: {
        createPost: helpPostCreatorService,
        updatePost: helpPostUpdateService,
        deletePost: helpPostDeleteService,
        getPost: helpPostGetService,
        searchPosts: helpPostSearchService,
        getUserPosts: helpPostGetByUserService,
        addComment: helpPostCommentService,
        addReply: helpPostReplyService,
    },
    commentOperations: {
        addComment: helpPostCommentService,
        addReply: helpPostReplyService,
    },
};
