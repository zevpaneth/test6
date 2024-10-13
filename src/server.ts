import express from 'express';
import dotenv from 'dotenv';
import {errorHandler} from "./middleware/errorHandler.js";
import connectDb from "./DAL/dbConnection.js";
import teacherRoute from "./routes/teacherRoute.js";
import studentRoute from "./routes/studentRoute.js";
import loginRoute from "./routes/loginRoute.js"
import validateToken from "./middleware/validateTokenHandler.js";
import gradesRoute from "./routes/gradesRoute.js";

dotenv.config();
await connectDb();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/teachers", teacherRoute);
app.use("/api/students", studentRoute);
app.use("/api/auth", loginRoute);
app.use("/api/grades", validateToken, gradesRoute);


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
