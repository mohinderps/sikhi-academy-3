import express from "express";
import multer from "multer";
import { adminAuth } from "../../middlewares/auth";
import {
  addSaakhi,
  getAllSaakhis,
  getSaakhiById,
  updateSaakhi,
  deleteSaakhi,
} from "./admin.saakhi.controller";
import { processAndUploadImage } from "../../middlewares/process-and-upload-image";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.use(adminAuth);

router.post("/", upload.single("image"), processAndUploadImage, addSaakhi);
router.get("/", getAllSaakhis);
router.get("/:id", getSaakhiById);
router.put("/:id", updateSaakhi);
router.delete("/:id", deleteSaakhi);

export default router;
