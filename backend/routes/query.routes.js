import express  from "express";
import {verifyToken} from '../utils/verifyUser.js';
import { addQuery } from "../controllers/query.controller.js";

const router = express.Router();

router.post("/add",verifyToken,addQuery);

export default router;