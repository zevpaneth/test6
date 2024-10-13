import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthenticatedRequest} from "../models/user.js";
import Teacher from "../models/teacher.js";
import { createClass } from "../services/classCreator.js";
import {Schema} from "mongoose";


dotenv.config();

export const registerTeacher = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { name, email, password, classname } = req.body;
    if (!name || !email || !password || !classname) {
        res.status(400);
        throw new Error("It is required to fill in the name, email, password and class name fields");
    }
    const teacherAvailable = await Teacher.findOne({ email });
    if (teacherAvailable) {
        res.status(400);
        throw new Error("Teacher already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = await Teacher.create({
        name,
        email,
        password: hashedPassword,
    })

    const teacherId: Schema.Types.ObjectId = teacher.id

    const newClass = await createClass(classname, teacherId)


    if (teacher && newClass) {
        res.status(201).json({
            class: newClass,
            teacher: teacher,
        })
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({
        message: "User registered"
    })
})

// export const loginTeacher = asyncHandler(async (req: express.Request, res: express.Response) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         res.status(400);
//         throw new Error("Email and password are required");
//     }
//     const user = await IUser.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//         const accessToken = jwt.sign(
//             {
//                 user: {
//                     username: user.username,
//                     email: user.email,
//                     id: user.id,
//                 },
//             },
//             process.env.ACCESS_TOKEN_SECRET || "123",
//             {
//                 expiresIn: "15m"
//             })
//         res.status(200).json({
//             accessToken
//         });
//     } else {
//         res.status(401);
//         throw new Error("Invalid email or password");
//     }
//     res.json({
//         message: "User login"
//     })
// })
//
// export const currentUser = asyncHandler(async (req: AuthenticatedRequest , res: express.Response) => {
//     res.json(req.user)
// })