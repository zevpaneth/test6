import express from "express";
import { registerStudent} from "../controllers/studentController.js";

const route = express.Router();

route.post("/register", registerStudent)

// route.post("/login", loginTeacher)



export default route