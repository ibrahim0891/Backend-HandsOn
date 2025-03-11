import { IuserUpdateableField } from "./user.interface";
import User from "./user.model";

 const userUpdateService = async ({
    updatedUser,
    userId,
}: {
    updatedUser: IuserUpdateableField;
    userId: string;
}) => {
    const user = await User.findByIdAndUpdate(userId, updatedUser, {
        new: true,
    }); 
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

const userGetterService = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

const userService = {
    userGetterService,
    userUpdateService,
};
export default userService;
