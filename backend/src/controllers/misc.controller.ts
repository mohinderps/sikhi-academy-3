import { Request, Response } from "express";
import { miscService } from "../services/misc.service";

export const getInitialData = async (req: Request, res: Response) => {
  const { lastReadSaakhiId, likedSaakhiIds, bookmarkedSaakhiIds } = req.body;

  try {
    const initialData = await miscService.getInitialData(
      lastReadSaakhiId,
      likedSaakhiIds,
      bookmarkedSaakhiIds
    );

    res.json(initialData);
  } catch (error) {
    console.error("Error fetching initial data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
