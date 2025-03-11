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
    comments: [
        {
            commentId: mongoose.Schema.Types.ObjectId,
            comment: String,
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
                    replyId: mongoose.Schema.Types.ObjectId,
                    reply: String,
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
        },
    ],
});

const HelpPost = mongoose.model("HelpPost", helpPostSchema);
export default HelpPost;
