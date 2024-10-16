import express from "express";
import { adminAuth } from "../../middlewares/auth";
import {
  addSaakhi,
  getSaakhiById,
  updateSaakhi,
  deleteSaakhi,
} from "../../controllers/saakhiController";

const router = express.Router();

router.use(adminAuth);

router.post("/", addSaakhi);
router.get("/:id", getSaakhiById);
router.put("/:id", updateSaakhi);
router.delete("/:id", deleteSaakhi);

export default router;
