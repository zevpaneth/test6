import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthenticatedRequest} from "../models/user.js";
import User from "../models/user.js";
import {Schema} from "mongoose";
import { chooseClass } from "../services/classService.js";


dotenv.config();

export const registerStudent = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { name, email, password, classname } = req.body;
    if (!name || !email || !password || !classname) {
        res.status(400);
        throw new Error("It is required to fill in the name, email, password and class name fields");
    }
    const studentAvailable = await User.findOne({ email });
    if (studentAvailable) {
        res.status(400);
        throw new Error("Student already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const chosenClass = await chooseClass(classname)
    if (!chosenClass) {
        res.status(404);
        throw new Error("No class found with this name");
    }

    const student = await User.create({
        name,
        email,
        password: hashedPassword,
        classId: chosenClass._id,
        role: "student",
    })

    if (student) {
        res.status(201).json({
            student
        })
    } else {
        res.status(400);
        throw new Error("Student data is not valid");
    }
    res.json({
        message: "Student registered"
    })
})
