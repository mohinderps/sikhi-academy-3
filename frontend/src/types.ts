export interface SaakhiSummary {
  id: string;
  title: string;
  guruJiName: string;
}

export interface InitialDataResponse {
  saakhisCount: number;
  firstSaakhi: SaakhiSummary | null;
  lastReadSaakhi: SaakhiSummary | null;
  likedSaakhis: SaakhiSummary[];
  bookmakedSaakhis: SaakhiSummary[];
}

export interface SaakhiResponse {
  id: string;
  title: string;
  content: string;
  guruJiName: string;
}
