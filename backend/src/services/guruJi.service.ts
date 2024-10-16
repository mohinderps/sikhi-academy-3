import prisma from "../config/database";
import { GuruJi } from "@prisma/client";

export const guruJiService = {
  getAllGuruJis: async (): Promise<GuruJi[]> => {
    return prisma.guruJi.findMany();
  },

  getGuruJiById: async (id: string): Promise<GuruJi | null> => {
    return prisma.guruJi.findUnique({
      where: { id },
    });
  },

  updateGuruJi: async (id: string, data: Partial<GuruJi>): Promise<GuruJi> => {
    return prisma.guruJi.update({
      where: { id },
      data,
    });
  },

  deleteGuruJi: async (id: string): Promise<void> => {
    await prisma.guruJi.delete({
      where: { id },
    });
  },
};
