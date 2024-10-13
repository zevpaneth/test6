import express from 'express';
import dotenv from 'dotenv';
import {errorHandler} from "./middleware/errorHandler.js";
import connectDb from "./DAL/dbConnection.js";
import teacherRoute from "./routes/teacherRoute.js";

dotenv.config();
await connectDb();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/teachers", teacherRoute);


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
