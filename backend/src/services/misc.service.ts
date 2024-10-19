import prisma from "../config/database";
import { InitialData, InitialDataRequestDto, SaakhiWithGuruJi } from "../types";

export const miscService = {
  getInitialData: async (
    params: InitialDataRequestDto
  ): Promise<InitialData> => {
    const {
      lastReadSaakhiId,
      likedSaakhiIds = [],
      bookmarkedSaakhiIds = [],
    } = params;

    const [
      saakhisCount,
      firstSaakhi,
      lastReadSaakhi,
      likedSaakhis,
      bookmarkedSaakhis,
    ]: [
      number,
      SaakhiWithGuruJi | null,
      SaakhiWithGuruJi | null,
      SaakhiWithGuruJi[],
      SaakhiWithGuruJi[]
    ] = await Promise.all([
      prisma.saakhi.count(),
      prisma.saakhi.findFirst({
        orderBy: {
          sequence: "asc",
        },
        include: {
          guruJi: true,
        },
      }),
      lastReadSaakhiId
        ? prisma.saakhi.findUnique({
            where: {
              id: lastReadSaakhiId,
            },
            include: {
              guruJi: true,
            },
          })
        : Promise.resolve(null),
      likedSaakhiIds.length > 0
        ? prisma.saakhi.findMany({
            where: { id: { in: likedSaakhiIds } },
            include: {
              guruJi: true,
            },
          })
        : Promise.resolve([]),
      bookmarkedSaakhiIds.length > 0
        ? prisma.saakhi.findMany({
            where: { id: { in: bookmarkedSaakhiIds } },
            include: {
              guruJi: true,
            },
          })
        : Promise.resolve([]),
    ]);

    return {
      saakhisCount,
      firstSaakhi,
      lastReadSaakhi,
      likedSaakhis,
      bookmarkedSaakhis,
    };
  },
};
