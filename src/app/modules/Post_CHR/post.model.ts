import mongoose, { mongo } from "mongoose"; 

const helpPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    urgencyLevel: {
        type: String,
        enum: ["Low", "Medium", "Urgent"],
        default: "Low",
        required: true,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    },
});

const commentSchema = new mongoose.Schema({
    text: String,
    postId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HelpPost",
    } , 
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    replies: [
        {
            replyText: String,
            createdAt: {
                type: Date,
                default: Date.now,
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],
});

helpPostSchema.add({
    comments: [commentSchema],
});

export const CommentModel = mongoose.model("Comment", commentSchema);
export const HelpPost = mongoose.model("HelpPost", helpPostSchema); 
export const PrivetPost = mongoose.model("PrivetPost", helpPostSchema);
