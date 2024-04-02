import express  from "express";
import {verifyToken} from '../utils/verifyUser.js';
import { addQuery,getQueryByUserId } from "../controllers/query.controller.js";

const router = express.Router();

//Kullanıcı id'ye göre sorgu ekleme
router.post("/add",verifyToken,addQuery);

//Kullanıcı id'ye göre sorguları listeleme
router.get("/user-query/:id",getQueryByUserId);

//Query ID'ye göre sorguları listeleme

export default router;