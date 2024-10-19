import prisma from "../config/database";
import { CreateSaakhiDto, SaakhiWithGuruJi, UpdateSaakhiDto } from "../types";

export const saakhiService = {
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

  getSaakhiByIdWithAdjacentSaakhis: async (
    id: string
  ): Promise<{
    currentSaakhi: SaakhiWithGuruJi | null;
    previousSaakhi: SaakhiWithGuruJi | null;
    nextSaakhi: SaakhiWithGuruJi | null;
  }> => {
    const currentSaakhi = await prisma.saakhi.findUnique({
      where: {
        id,
      },
      include: {
        guruJi: true,
      },
    });

    if (!currentSaakhi) {
      return {
        currentSaakhi: null,
        previousSaakhi: null,
        nextSaakhi: null,
      };
    }

    const [previousSaakhi, nextSaakhi] = await Promise.all([
      prisma.saakhi.findFirst({
        orderBy: {
          sequence: "desc",
        },
        where: {
          sequence: {
            lt: currentSaakhi.sequence,
          },
        },
        include: {
          guruJi: true,
        },
      }),
      prisma.saakhi.findFirst({
        orderBy: {
          sequence: "asc",
        },
        where: {
          sequence: {
            gt: currentSaakhi.sequence,
          },
        },
        include: {
          guruJi: true,
        },
      }),
    ]);

    return {
      currentSaakhi,
      previousSaakhi,
      nextSaakhi,
    };
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
