import { Saakhi, GuruJi } from "@prisma/client";

export interface CreateSaakhiDto {
  title: string;
  content: string;
  guruJiId: string;
  sequence: number;
}

export interface UpdateSaakhiDto {
  title?: string;
  content?: string;
  guruJiId?: string;
  sequence?: number;
}

export interface SaakhiWithGuruJi extends Saakhi {
  guruJi: GuruJi;
}

export interface CreateGuruJiDto {
  order: number;
  name: string;
}

export interface UpdateGuruJiDto {
  order?: number;
  name?: string;
}

export interface InitialDataRequestDto {
  lastReadSaakhiId?: string;
  likedSaakhiIds?: string[];
  bookmarkedSaakhiIds?: string[];
}

export interface InitialData {
  saakhisCount: number;
  firstSaakhi: SaakhiWithGuruJi | null;
  lastReadSaakhi: SaakhiWithGuruJi | null;
  likedSaakhis: SaakhiWithGuruJi[];
  bookmarkedSaakhis: SaakhiWithGuruJi[];
}

export interface InitialDataResponseDto {
  saakhisCount: number;
  firstSaakhi: SaakhiWithGuruJi | null;
  lastReadSaakhi: SaakhiWithGuruJi | null;
  likedSaakhis: SaakhiWithGuruJi[];
  bookmarkedSaakhis: SaakhiWithGuruJi[];
}
