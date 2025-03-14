import mongoose, { ResolveSchemaOptions } from "mongoose";

//  title, description, date, time, location, and category.

const eventSchema = new mongoose.Schema<ResolveSchemaOptions<any>>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }, 
        date: {
            type: Date,
            default: Date.now,
        },
        time: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
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
        availability: {
            type: Object, 
            date: {
                type: Date,
                required: true
            },
            time: {
                start: {
                    type: String,
                    required: true,
                },
                end: {
                    type: String,
                    required: true,
                },
            },
            capacity: {
                totalSlots: {
                    type: Number,
                    required: true,
                    default: 0,
                },
                filledSlots: {
                    type: Number,
                    default: 0,
                },
            },
        },
        attendees: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                status: {
                    type: String,
                    enum: ["Joined", "Interested", "Pending"],
                },
            },
        ],
        
        teamId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
        }

    },
    {
        virtuals: true,
    }
);


eventSchema.virtual('isEventAvailable').get(function(this: any) {
    const today = new Date()
    const eventDate = new Date(this.availability.date)
    const isSlotAvailable = this.availability.capacity.filledSlots < this.availability.capacity.totalSlots
    
    return isSlotAvailable && eventDate >= today
})



const Event = mongoose.model("Event", eventSchema);
export const PrivetEvents = mongoose.model("PrivetEvents", eventSchema);

export default Event;
