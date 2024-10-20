export interface CreateGuruJiDto {
  order: number;
  name: string;
}

export interface UpdateGuruJiDto {
  order?: number;
  name?: string;
}

export interface GuruJiSummary {
  id: string;
  name: string;
}
