import { Request} from "express";
import mongoose,{ Schema, Document } from "mongoose";


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    classId?: mongoose.Types.ObjectId;
}

export interface AuthenticatedRequest extends Request {
    user?: IUser
}
const userSchema: Schema = new Schema({
    name: { type: String, required: [true, 'the name field is required'] },
    email: { type: String, required: [true, 'the email field is required'] },
    password: { type: String, required: [true, 'the password field is required'] },
    role: { type: String, enum: ['teacher', 'student'], required: [true, 'the role field is required'] },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: false },
})

export default mongoose.model<IUser>('User', userSchema);