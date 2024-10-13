import Class from "../models/class.js";
import { Schema } from "mongoose";

export const  createClass = (className: string, teacherId: Schema.Types.ObjectId)=> {
    return Class.create({
        name: className,
        teacherId: teacherId,
    })
}