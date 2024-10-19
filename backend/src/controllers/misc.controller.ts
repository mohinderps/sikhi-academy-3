import { Request, Response } from "express";
import { miscService } from "../services/misc.service";
import { InitialDataRequestDto, InitialDataResponseDto } from "../types";

export const getInitialData = async (req: Request, res: Response) => {
  const params: InitialDataRequestDto = req.body;

  try {
    const initialData: InitialDataResponseDto =
      await miscService.getInitialData(params);

    res.json(initialData);
  } catch (error) {
    console.error("Error fetching initial data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
