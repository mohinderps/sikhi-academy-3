import express from "express";
import { adminAuth } from "../middlewares/auth";
import {
  getAllGuruJis,
  getGuruJiById,
  updateGuruJi,
  deleteGuruJi,
} from "../controllers/admin.guruJi.controller";

const router = express.Router();

router.use(adminAuth);

router.get("/", getAllGuruJis);
router.get("/:id", getGuruJiById);
router.put("/:id", updateGuruJi);
router.delete("/:id", deleteGuruJi);

export default router;
