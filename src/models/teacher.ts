import mongoose, { Schema, Document } from 'mongoose';

interface ITeacher extends Document {
    name: string;
    email: string;
    password: string;
}

const teacherSchema: Schema = new Schema({
    name: { type: String, required: [true, 'name field is required'] },
    email: { type: String, required: [true, 'email field is required'] },
    password: { type: String, required: [true, 'password field is required'] },
})

export default mongoose.model('Teacher', teacherSchema);