import prisma from "../config/database";

type SaakhiSummary = {
  id: string;
  title: string;
  guruJi: {
    name: string;
  };
};

type InitialData = {
  saakhisCount: number;
  firstSaakhi: SaakhiSummary | null;
  lastReadSaakhi: SaakhiSummary | null;
  likedSaakhis: SaakhiSummary[];
  bookmarkedSaakhis: SaakhiSummary[];
};

export const miscService = {
  getInitialData: async (
    lastReadSaakhiId?: string,
    likedSaakhiIds?: string[],
    bookmarkedSaakhiIds?: string[]
  ): Promise<InitialData> => {
    const saakhisCount = await prisma.saakhi.count();

    const firstSaakhi = await prisma.saakhi.findFirst({
      orderBy: { sequence: "asc" },
      select: {
        id: true,
        title: true,
        guruJi: { select: { name: true } },
      },
    });

    const lastReadSaakhi = lastReadSaakhiId
      ? await prisma.saakhi.findUnique({
          where: { id: lastReadSaakhiId },
          select: {
            id: true,
            title: true,
            guruJi: { select: { name: true } },
          },
        })
      : null;

    const likedSaakhis =
      likedSaakhiIds && likedSaakhiIds.length > 0
        ? await prisma.saakhi.findMany({
            where: { id: { in: likedSaakhiIds } },
            select: {
              id: true,
              title: true,
              guruJi: { select: { name: true } },
            },
          })
        : [];

    const bookmarkedSaakhis =
      bookmarkedSaakhiIds && bookmarkedSaakhiIds.length > 0
        ? await prisma.saakhi.findMany({
            where: { id: { in: bookmarkedSaakhiIds } },
            select: {
              id: true,
              title: true,
              guruJi: { select: { name: true } },
            },
          })
        : [];

    return {
      saakhisCount,
      firstSaakhi,
      lastReadSaakhi,
      likedSaakhis,
      bookmarkedSaakhis,
    };
  },
};
