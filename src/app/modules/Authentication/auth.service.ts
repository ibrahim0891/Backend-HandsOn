import sendResponse from "../../utils/sendResponse";
import User from "../user/user.model";
import { ILogIn, IUser } from "./auth.interface"; 

const LoginService = async (logInPayload: ILogIn) => {
    const { email, password } = logInPayload;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
        throw new Error("Password not match");
    }
    return user;
};

const SignUService = async (signUpPayload: IUser) => {
    const user = new User(signUpPayload);
    return await user.save();
};


export const authService = {
    LoginService,
    SignUService,
};
