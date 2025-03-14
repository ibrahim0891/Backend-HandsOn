import { HelpPost, PrivetPost } from "../../Post_CHR/post.model";
import TeamModel from "../team.model";
import { Ipost } from "../../Post_CHR/post.interface.ts";
const helpPostCreatorService = async (teamId: string, newPostData: Ipost) => {
    try {
        const team = await TeamModel.findById(teamId);
        const PostModel =
            team.membershipType === "public" ? HelpPost : PrivetPost;
        const newPost = await PostModel.create({ teamId, ...newPostData });
        return newPost;
    } catch (error) {
        throw new Error("Failed to create post");
    }
};

const helpPostUpdateService = async (
    teamId: string,
    postId: string,
    updatedPostData: Ipost
) => {
    try {
        const team = await TeamModel.findById(teamId);
        const PostModel =
            team.membershipType === "public" ? HelpPost : PrivetPost;
        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { teamId, ...updatedPostData },
            { new: true }
        );
        return updatedPost;
    } catch (error) {
        throw new Error("Failed to update post");
    }
};

const helpPostDeleteService = async (teamId: string, postId: string) => {
    try {
        const team = await TeamModel.findById(teamId);
        const PostModel =
            team.membershipType === "public" ? HelpPost : PrivetPost;
        const deletedPost = await PostModel.findByIdAndDelete(postId);
        return deletedPost;
    } catch (error) {
        throw new Error("Failed to delete post");
    }
};

const helpPostGetService = async (teamId: string, postId: string) => {
    try {
        const team = await TeamModel.findById(teamId);
        const PostModel =
            team.membershipType === "public" ? HelpPost : PrivetPost;
        const post = await PostModel.findOne({ _id: postId, teamId });
        return post;
    } catch (error) {
        throw new Error("Failed to retrieve post");
    }
};

const helpPostSearchService = async (teamId: string, q: string) => {
    try {
        const team = await TeamModel.findById(teamId);
        const PostModel =
            team.membershipType === "public" ? HelpPost : PrivetPost;
        const searchResults = await PostModel.find({
            teamId,
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

const helpPostGetByUserService = async (teamId: string, userId: string) => {
    try {
        const team = await TeamModel.findById(teamId);
        const PostModel =
            team.membershipType === "public" ? HelpPost : PrivetPost;
        const userPosts = await PostModel.find({ teamId, userId });
        return userPosts;
    } catch (error) {
        throw new Error("Failed to retrieve user's posts");
    }
};

export const teamPostService = {
    createPostByTeam: helpPostCreatorService,
    updatePostByTeam: helpPostUpdateService,
    deletePostByTeam: helpPostDeleteService,
    getPostByTeam: helpPostGetService,
    searchPostByTeam: helpPostSearchService,
    getPostByUserByTeam: helpPostGetByUserService,
};
