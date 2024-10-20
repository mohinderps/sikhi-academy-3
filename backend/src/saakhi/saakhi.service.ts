import { SaakhiSummary } from "../admin/saakhi/admin.saakhi.types";
import prisma from "../config/database";
import { SaakhiWithAdjacentSaakhis } from "./saakhi.types";

export const saakhiService = {
  getSaakhiById: async (id: string): Promise<SaakhiWithAdjacentSaakhis> => {
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

  getAllSaakhiSummaries: async (): Promise<SaakhiSummary[]> => {
    return await prisma.saakhi.findMany({
      select: {
        id: true,
        title: true,
        guruJi: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        sequence: "asc",
      },
    });
  },
};
