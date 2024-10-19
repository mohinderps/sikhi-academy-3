import express from "express";
import { adminAuth } from "../middlewares/auth";
import {
  addSaakhi,
  getAllSaakhis,
  getAdminSaakhiById,
  updateSaakhi,
  deleteSaakhi,
} from "../controllers/saakhi.controller";

const router = express.Router();

router.use(adminAuth);

router.post("/", addSaakhi);
router.get("/", getAllSaakhis);
router.get("/:id", getAdminSaakhiById);
router.put("/:id", updateSaakhi);
router.delete("/:id", deleteSaakhi);

export default router;
