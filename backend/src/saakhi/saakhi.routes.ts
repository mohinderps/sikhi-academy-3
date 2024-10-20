import express from "express";
import { getSaakhiById, getAllSaakhiSummaries } from "./saakhi.controller";

const router = express.Router();

router.get("/summaries", getAllSaakhiSummaries);
router.get("/:id", getSaakhiById);

export default router;
