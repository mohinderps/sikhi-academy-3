import {
  SaakhiSummary,
  SaakhiSummaryWithContent,
} from "../admin/saakhi/admin.saakhi.types";
import { SaakhiWithGuruJi } from "../types";

export interface SaakhiWithAdjacentSaakhis {
  currentSaakhi: SaakhiWithGuruJi | null;
  previousSaakhi: SaakhiWithGuruJi | null;
  nextSaakhi: SaakhiWithGuruJi | null;
}

export interface SaakhiResponseDto {
  currentSaakhi: SaakhiSummaryWithContent | null;
  previousSaakhi: SaakhiSummary | null;
  nextSaakhi: SaakhiSummary | null;
}
