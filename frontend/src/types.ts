export interface SaakhiSummary {
  id: string;
  title: string;
  guruJi: {
    id: string;
    name: string;
  };
}

export interface SaakhiSummaryWithContent extends SaakhiSummary {
  content: string;
}

export interface InitialDataResponse {
  saakhisCount: number;
  firstSaakhi: SaakhiSummary | null;
  lastReadSaakhi: SaakhiSummary | null;
  likedSaakhis: SaakhiSummary[];
  bookmarkedSaakhis: SaakhiSummary[];
}

export interface SaakhiResponse {
  currentSaakhi: SaakhiSummaryWithContent | null;
  previousSaakhi: SaakhiSummary | null;
  nextSaakhi: SaakhiSummary | null;
}
