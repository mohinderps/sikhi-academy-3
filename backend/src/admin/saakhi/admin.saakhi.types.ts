import { GuruJiSummary } from "../guru-ji/admin.guru-ji.types";

export interface CreateSaakhiDto {
  title: string;
  content: string;
  guruJiId: string;
  sequence: number;
}

export interface ImageUrls {
  desktopImageUrl?: string;
  mobileImageUrl?: string;
}

export interface CreateSaakhiWithImagesDto extends CreateSaakhiDto, ImageUrls {}

export interface UpdateSaakhiDto {
  title?: string;
  content?: string;
  guruJiId?: string;
  sequence?: number;
}

export interface SaakhiSummary {
  id: string;
  title: string;
  guruJi: GuruJiSummary;
}

export interface SaakhiSummaryWithContent extends SaakhiSummary {
  content: string;
}
