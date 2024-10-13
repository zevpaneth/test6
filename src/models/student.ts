import mongoose, { Schema, Document } from 'mongoose';

interface IStudent extends Document {
    name: string;
    email: string;
    password: string;
    classId: Schema.Types.ObjectId;
}

const classSchema: Schema = new Schema({
    name: { type: String, required: [true, 'the name field is required'] },
    email: { type: String, required: [true, 'the email field is required'] },
    password: { type: String, required: [true, 'the password field is required'] },
    claasId: { type: Schema.Types.ObjectId, ref: 'Class', required: [true, 'the claas field is required'] },
})

export default mongoose.model('Student', classSchema);