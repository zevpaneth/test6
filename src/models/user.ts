import { Request} from "express";


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

export interface AuthenticatedRequest extends Request {
    user?: IUser
}