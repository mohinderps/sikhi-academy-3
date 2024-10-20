import prisma from "../../config/database";
import { CreateSaakhiDto, UpdateSaakhiDto } from "./admin.saakhi.types";
import { SaakhiWithGuruJi } from "../../types";

export const adminSaakhiService = {
  getAllSaakhis: async (): Promise<SaakhiWithGuruJi[]> => {
    return prisma.saakhi.findMany({
      include: { guruJi: true },
      orderBy: { sequence: "asc" },
    });
  },

  getSaakhiById: async (id: string): Promise<SaakhiWithGuruJi | null> => {
    return prisma.saakhi.findUnique({
      where: { id },
      include: { guruJi: true },
    });
  },

  addSaakhi: async (data: CreateSaakhiDto): Promise<SaakhiWithGuruJi> => {
    return prisma.saakhi.create({
      data,
      include: { guruJi: true },
    });
  },

  updateSaakhi: async (
    id: string,
    data: UpdateSaakhiDto
  ): Promise<SaakhiWithGuruJi> => {
    return prisma.saakhi.update({
      where: { id },
      data,
      include: { guruJi: true },
    });
  },

  deleteSaakhi: async (id: string): Promise<void> => {
    await prisma.saakhi.delete({
      where: { id },
    });
  },
};
