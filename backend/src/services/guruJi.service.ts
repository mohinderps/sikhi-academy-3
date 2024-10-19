import prisma from "../config/database";
import { GuruJi } from "@prisma/client";
import { CreateGuruJiDto, UpdateGuruJiDto } from "../types";

export const guruJiService = {
  getAllGuruJis: async (): Promise<GuruJi[]> => {
    return prisma.guruJi.findMany({
      orderBy: { order: "asc" },
    });
  },

  getGuruJiById: async (id: string): Promise<GuruJi | null> => {
    return prisma.guruJi.findUnique({
      where: { id },
    });
  },

  addGuruJi: async (data: CreateGuruJiDto): Promise<GuruJi> => {
    return prisma.guruJi.create({
      data,
    });
  },

  updateGuruJi: async (id: string, data: UpdateGuruJiDto): Promise<GuruJi> => {
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
