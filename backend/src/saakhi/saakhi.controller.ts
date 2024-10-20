import { Request, Response } from "express";
import { saakhiService } from "./saakhi.service";
import { toSaakhiResponseDto } from "./saakhi.transformers";

export const getSaakhiById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await saakhiService.getSaakhiById(id);
    const transformedResponse = toSaakhiResponseDto(response);

    if (transformedResponse.currentSaakhi) {
      res.json(transformedResponse);
    } else {
      res.status(404).json({ error: "Saakhi not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Saakhi" });
  }
};

export const getAllSaakhiSummaries = async (req: Request, res: Response) => {
  try {
    const summaries = await saakhiService.getAllSaakhiSummaries();
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Saakhi summaries" });
  }
};
