import { Request, Response } from "express";
import { miscService } from "./misc.service";
import { InitialDataRequestDto, InitialDataResponseDto } from "./misc.types";
import { transformSaakhiToSummary } from "./misc.transformers";
import { initialDataRequestSchema } from "./misc.types";

export const getInitialData = async (req: Request, res: Response) => {
  const result = initialDataRequestSchema.safeParse(req.query);

  if (!result.success) {
    res
      .status(400)
      .json({ error: "Invalid request parameters", details: result.error });
  } else {
    const params: InitialDataRequestDto = result.data;
    try {
      const initialData = await miscService.getInitialData(params);
      const transformedData: InitialDataResponseDto = {
        saakhisCount: initialData.saakhisCount,
        firstSaakhi: initialData.firstSaakhi
          ? transformSaakhiToSummary(initialData.firstSaakhi)
          : null,
        lastReadSaakhi: initialData.lastReadSaakhi
          ? transformSaakhiToSummary(initialData.lastReadSaakhi)
          : null,
        likedSaakhis: initialData.likedSaakhis.map(transformSaakhiToSummary),
        bookmarkedSaakhis: initialData.bookmarkedSaakhis.map(
          transformSaakhiToSummary
        ),
      };
      res.json(transformedData);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
