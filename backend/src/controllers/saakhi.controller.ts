import { Request, Response } from "express";
import { saakhiService } from "../services/saakhi.service";
import { CreateSaakhiDto, UpdateSaakhiDto } from "../types";

export const addSaakhi = async (req: Request, res: Response) => {
  try {
    const saakhiData: CreateSaakhiDto = req.body;
    const newSaakhi = await saakhiService.addSaakhi(saakhiData);
    res.status(201).json(newSaakhi);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to create Saakhi" });
  }
};

export const getAllSaakhis = async (req: Request, res: Response) => {
  try {
    const saakhis = await saakhiService.getAllSaakhis();
    res.json(saakhis);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Saakhis" });
  }
};

export const getAdminSaakhiById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const saakhi = await saakhiService.getSaakhiById(id);
    if (saakhi) {
      res.json(saakhi);
    } else {
      res.status(404).json({ error: "Saakhi not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Saakhi" });
  }
};

export const getSaakhiById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { currentSaakhi, previousSaakhi, nextSaakhi } =
      await saakhiService.getSaakhiByIdWithAdjacentSaakhis(id);

    if (currentSaakhi) {
      const transformedSaakhi = {
        id: currentSaakhi.id,
        title: currentSaakhi.title,
        content: currentSaakhi.content,
        guruJi: {
          name: currentSaakhi.guruJi.name,
        },
        previousSaakhi: previousSaakhi
          ? {
              id: previousSaakhi.id,
              title: previousSaakhi.title,
              guruJi: {
                name: previousSaakhi.guruJi.name,
              },
            }
          : null,
        nextSaakhi: nextSaakhi
          ? {
              id: nextSaakhi.id,
              title: nextSaakhi.title,
              guruJi: {
                name: nextSaakhi.guruJi.name,
              },
            }
          : null,
      };
      res.json(transformedSaakhi);
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
    const updatedSaakhi = await saakhiService.updateSaakhi(id, saakhiData);
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
    await saakhiService.deleteSaakhi(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete Saakhi" });
  }
};
