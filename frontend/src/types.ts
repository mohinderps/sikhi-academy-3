export interface SaakhiSummary {
  id: string;
  title: string;
  guruJi: {
    name: string;
  };
}

export interface InitialDataResponse {
  saakhisCount: number;
  firstSaakhi: SaakhiSummary | null;
  lastReadSaakhi: SaakhiSummary | null;
  likedSaakhis: SaakhiSummary[];
  bookmarkedSaakhis: SaakhiSummary[];
}

export interface SaakhiResponse {
  id: string;
  title: string;
  content: string;
  guruJiName: string;
}
