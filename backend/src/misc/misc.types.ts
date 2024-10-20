import { z } from "zod";
import { SaakhiWithGuruJi } from "../types";
import { SaakhiSummary } from "../admin/saakhi/admin.saakhi.types";

export const initialDataRequestSchema = z.object({
  lastReadSaakhiId: z.string().optional(),
  likedSaakhiIds: z.array(z.string()).optional(),
  bookmarkedSaakhiIds: z.array(z.string()).optional(),
});

export type InitialDataRequestDto = z.infer<typeof initialDataRequestSchema>;

export interface InitialData {
  saakhisCount: number;
  firstSaakhi: SaakhiWithGuruJi | null;
  lastReadSaakhi: SaakhiWithGuruJi | null;
  likedSaakhis: SaakhiWithGuruJi[];
  bookmarkedSaakhis: SaakhiWithGuruJi[];
}

export interface InitialDataResponseDto {
  saakhisCount: number;
  firstSaakhi: SaakhiSummary | null;
  lastReadSaakhi: SaakhiSummary | null;
  likedSaakhis: SaakhiSummary[];
  bookmarkedSaakhis: SaakhiSummary[];
}
