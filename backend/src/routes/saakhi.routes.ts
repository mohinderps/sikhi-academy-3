import express from "express";
import { getSaakhiById } from "../controllers/saakhi.controller";

const router = express.Router();

router.get("/:id", getSaakhiById);

export default router;
