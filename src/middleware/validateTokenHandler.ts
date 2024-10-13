import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import express, {NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import {AuthenticatedRequest} from "../models/user.js";

dotenv.config();




const validateToken = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token: string;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (error: any, decoded: any) => {
            if (error) {
                res.status(401);
                throw new Error("Unauthorized");
            }
            req.user = decoded.user;
            next()
        });

        if (!token){
            res.status(401);
            throw new Error("Invalid token");
        }
    }
})

export default validateToken;