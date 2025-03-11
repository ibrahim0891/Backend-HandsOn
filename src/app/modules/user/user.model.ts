import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../Authentication/auth.interface";
import config from "../../config";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    skills: {
        type: [String],
    },
    causedSupport: {
        type: [String],
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    location: {
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    points: {
        type: Number,
        default: 0,
        validate: {
            validator: function (value: number) {
                return value >= 0;
            },
            message: "Points must be a non-negative number.",
        },
    },
    volunteerHistory: [
        {
            eventId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Event",
            },
            taskDescription: {
                type: String,
            },
            role: {
                type: String,
            },
            date: {
                type: Date,
            },
        },
    ],
    contributions: {
        eventOrganised: {
            type: Number,
            default: 0,
        },
        eventParticipated: {
            type: Number,
            default: 0,
        },
        causesContributed: [
            {
                type: String,
            },
        ],
        mileStoneAchived: [
            {
                type: String,
            },
        ],
    },
});

//password hashing
userSchema.pre("save", async function (next) {
    const user = this as IUser;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );
});

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

//Password compare korar jonne database level checking
userSchema.methods.comparePassword = async function (password: string) {
    const user = this as IUser;
    return bcrypt.compare(password, user.password);
};

let User = mongoose.model("User", userSchema);

export default User;
