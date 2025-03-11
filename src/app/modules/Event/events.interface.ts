interface IEvent {
    title: string;
    description: string;
    date: Date;
    time: string;
    category: string;
    creatorId: string;
    location: string;
    availability: object
    volunteers: {
        userId?: string;
        status?: "Joined" | "Interested" | "Pending";
    }[];
}

export default IEvent;
