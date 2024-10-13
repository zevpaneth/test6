import mongoose, { Schema, Document } from 'mongoose';
import {IUser} from "./user.js";

interface IStudent extends IUser {
    classId: mongoose.Types.ObjectId;
}

const studentSchema: Schema = new Schema({
    name: { type: String, required: [true, 'the name field is required'] },
    email: { type: String, required: [true, 'the email field is required'] },
    password: { type: String, required: [true, 'the password field is required'] },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: [true, 'the classId field is required'] },
})

export default mongoose.model('Student', studentSchema);