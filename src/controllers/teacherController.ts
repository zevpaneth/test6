import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/user.js";
import { createClass } from "../services/classService.js";
import {Schema} from "mongoose";


dotenv.config();

export const registerTeacher = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { name, email, password, classname } = req.body;
    if (!name || !email || !password || !classname) {
        res.status(400);
        throw new Error("It is required to fill in the name, email, password and class name fields");
    }
    const teacherAvailable = await User.findOne({ email });
    if (teacherAvailable) {
        res.status(400);
        throw new Error("Teacher already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "teacher",
    })

    const teacherId: Schema.Types.ObjectId = teacher.id

    const newClass = await createClass(classname, teacherId)


    if (teacher && newClass) {
        res.status(201).json({
            classId: newClass.id
        })
    } else {
        res.status(400);
        throw new Error("Teacher data is not valid");
    }
    res.json({
        message: "Teacher registered"
    })
})
