import express from "express";
import { getInitialData } from "./misc.controller";

const router = express.Router();

router.get("/initial-data", getInitialData);

export default router;
