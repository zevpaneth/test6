import mongoose, { Schema, Document } from "mongoose";

interface IGrade extends Document {
    studentId: Schema.Types.ObjectId;
    classId: Schema.Types.ObjectId;
    grade: number;
    comment: string;
    timeStamp: Date;
}

const GradeSchema: Schema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: [true, 'the studentId field is required'] },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: [true, 'the studentId field is required'] },
    grade: { type: Number, required: [true, 'the grade field is required'] },
    comment: { type: String, required: [true, 'the comment field is required'] },
    timeStamp: { type: Date, default: Date.now }
})

export default mongoose.model('Grade', GradeSchema);