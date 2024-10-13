import express from "express";
import { registerStudent} from "../controllers/studentController.js";

const route = express.Router();

route.post("/register", registerStudent)




export default route