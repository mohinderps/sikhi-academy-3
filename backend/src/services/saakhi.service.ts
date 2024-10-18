import prisma from "../config/database";
import { Saakhi } from "@prisma/client";

export const saakhiService = {
  getAllSaakhis: async (): Promise<Saakhi[]> => {
    return prisma.saakhi.findMany({
      include: { guruJi: true },
      orderBy: { sequence: "asc" },
    });
  },

  getSaakhiById: async (id: string): Promise<Saakhi | null> => {
    return prisma.saakhi.findUnique({
      where: { id },
      include: { guruJi: true },
    });
  },

  addSaakhi: async (
    data: Pick<Saakhi, "title" | "content" | "guruJiId" | "sequence">
  ): Promise<Saakhi> => {
    return prisma.saakhi.create({
      data,
      include: { guruJi: true },
    });
  },

  updateSaakhi: async (id: string, data: Partial<Saakhi>): Promise<Saakhi> => {
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
