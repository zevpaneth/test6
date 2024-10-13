import constants from 'constants.js'
import { Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import dotenv from "dotenv";
dotenv.config();

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(statusCode).json({
                title: 'Validation failed',
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        case constants.NOT_FOUND:
            res.status(statusCode).json({
                title: 'Not Found',
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        case constants.UNAUTHORIZED:
            res.status(statusCode).json({
                title: 'Unauthorized',
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        case constants.FORBIDDEN:
            res.status(statusCode).json({
                title: 'Forbidden',
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        case constants.SERVER_ERROR:
            res.status(statusCode).json({
                    title: 'Something went wrong',
                    message: err.message,
                    stackTrace: err.stack,
            })
            break;
            default:
                res.status(statusCode).json({
                    message: err.message,
                    stackTrace: err.stack,
                })
    }

}