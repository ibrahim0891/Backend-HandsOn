import mongoose, { mongo, ResolveSchemaOptions } from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    membershipType: {
        type: String,
        enum: ["privet", "public"],
        default: "open",
    },
    description: {
        type: String,
        required: true,
    },
    leaderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    invitedMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    dashboard: {
            teamMembers: {
                type: Number,
                default: 0
            },
            totalEvents: {
                type: Number,
                default: 0
            },
            achievements: [{
                title: {
                    type: String,
                    required: true
                },
                description: {
                    type: String
                },
                dateEarned: {
                    type: Date,
                    default: Date.now
                },
                badge: {
                    type: String
                }
            }]
        },
    
});

teamSchema.pre('save', function(next) {
    if (this.events) {
        this.dashboard.totalEvents = this.events.length;
    }
    if (this.members) {
        this.dashboard.teamMembers = this.members.length;
    }
    next();
});


const TeamModel = new mongoose.model("Team", teamSchema);

export default TeamModel;
