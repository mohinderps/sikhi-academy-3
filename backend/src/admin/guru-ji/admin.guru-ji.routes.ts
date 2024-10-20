import express from "express";
import { adminAuth } from "../../middlewares/auth";
import {
  getAllGuruJis,
  getGuruJiById,
  addGuruJi,
  updateGuruJi,
  deleteGuruJi,
} from "./admin.guru-ji.controller";

const router = express.Router();

router.use(adminAuth);

router.get("/", getAllGuruJis);
router.get("/:id", getGuruJiById);
router.post("/", addGuruJi);
router.put("/:id", updateGuruJi);
router.delete("/:id", deleteGuruJi);

export default router;
