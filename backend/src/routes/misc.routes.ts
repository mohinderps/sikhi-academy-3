import express from "express";
import { getInitialData } from "../controllers/misc.controller";

const router = express.Router();

router.post("/initial-data", getInitialData);

export default router;
