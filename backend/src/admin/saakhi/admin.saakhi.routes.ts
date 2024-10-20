import express from "express";
import { adminAuth } from "../../middlewares/auth";
import {
  addSaakhi,
  getAllSaakhis,
  getSaakhiById,
  updateSaakhi,
  deleteSaakhi,
} from "./admin.saakhi.controller";

const router = express.Router();

router.use(adminAuth);

router.post("/", addSaakhi);
router.get("/", getAllSaakhis);
router.get("/:id", getSaakhiById);
router.put("/:id", updateSaakhi);
router.delete("/:id", deleteSaakhi);

export default router;
