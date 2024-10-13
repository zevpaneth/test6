import mongoose, { Schema, Document } from 'mongoose';

interface IClass extends Document {
    name: string;
    teacherId: Schema.Types.ObjectId;
}

const classSchema: Schema = new Schema({
    name: { type: String, required: [true, 'the name field is required'] },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
})

export default mongoose.model('Class', classSchema);