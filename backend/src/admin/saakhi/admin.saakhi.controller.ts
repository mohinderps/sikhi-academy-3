import { Request, Response } from "express";
import { adminSaakhiService } from "./admin.saakhi.service";
import { CreateSaakhiDto, UpdateSaakhiDto } from "./admin.saakhi.types";

export const addSaakhi = async (req: Request, res: Response) => {
  try {
    const saakhiData: CreateSaakhiDto = req.body;
    const newSaakhi = await adminSaakhiService.addSaakhi(saakhiData);
    res.status(201).json(newSaakhi);
  } catch (error) {
    res.status(400).json({ error: "Failed to create Saakhi" });
  }
};

export const getAllSaakhis = async (req: Request, res: Response) => {
  try {
    const saakhis = await adminSaakhiService.getAllSaakhis();
    res.json(saakhis);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Saakhis" });
  }
};

export const getSaakhiById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const saakhi = await adminSaakhiService.getSaakhiById(id);
    if (saakhi) {
      res.json(saakhi);
    } else {
      res.status(404).json({ error: "Saakhi not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Saakhi" });
  }
};

export const updateSaakhi = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const saakhiData: UpdateSaakhiDto = req.body;
    const updatedSaakhi = await adminSaakhiService.updateSaakhi(id, saakhiData);
    res.json(updatedSaakhi);
  } catch (error) {
    res.status(400).json({
      error: "Failed to update Saakhi",
      reason:
        "The request was invalid or cannot be served. This could be due to invalid input data or a conflict with existing records.",
    });
  }
};

export const deleteSaakhi = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await adminSaakhiService.deleteSaakhi(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete Saakhi" });
  }
};
