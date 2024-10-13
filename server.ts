import express from 'express';
import dotenv from 'dotenv';
import {errorHandler} from "./src/middleware/errorHandler.js";
import connectDb from "./src/DAL/dbConnection.js";

dotenv.config();
await connectDb();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// כאן אני צריך לעשות את routes
//app.use("/api/contacts", contactRoutes);
// app.use("/api/users", userRoutes);

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
