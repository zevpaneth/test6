import express from "express";
import { registerTeacher} from "../controllers/teacherController.js";

const route = express.Router();

route.post("/register", registerTeacher)



export default route