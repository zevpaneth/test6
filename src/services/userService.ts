import User from "../models/user.js";

export const findUser = async (email: string) => {
    const user = User.findOne({ email })
    if (!user) {
        return;
    }
    return user;
}
