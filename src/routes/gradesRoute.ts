import express from "express";
import {addGrade} from "../controllers/gradesController.js";

const route = express.Router();

route.post("/", addGrade)


export default route