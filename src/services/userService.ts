import Teacher from "../models/teacher.js";
import Student from "../models/student.js";

export const findUser = async (email: string) => {
    let user;
    user = await Teacher.findOne({ email });
    if (!user) {
        user = await Student.findOne({ email });
    }
    if (user) {
        return user;
    }
    return undefined;
}
