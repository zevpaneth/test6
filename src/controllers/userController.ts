import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findUser } from "../services/userService.js";


dotenv.config();

export const loginUser = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Email and password are required");
    }


    const user = await findUser(email);
    console.log(user)
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                username: user.name,
                email: user.email,
                id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET || "123",
            {
                expiresIn: "15m"
            })
        res.status(200).json({
            accessToken
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
    res.json({
        message: "User login"
    })
})