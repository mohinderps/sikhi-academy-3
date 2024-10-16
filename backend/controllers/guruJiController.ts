import { Request, Response } from "express";
import prisma from "../src/config/database";

export const getAllGuruJis = async (req: Request, res: Response) => {
  try {
    const allGuruJis = await prisma.guruJi.findMany();
    res.json(allGuruJis);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch GuruJis" });
  }
};

export const getGuruJiById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const guruJi = await prisma.guruJi.findUnique({
      where: { id },
    });
    if (guruJi) {
      res.json(guruJi);
    } else {
      res.status(404).json({ error: "GuruJi not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch GuruJi" });
  }
};

export const updateGuruJi = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { order, name } = req.body;
    const updatedGuruJi = await prisma.guruJi.update({
      where: { id },
      data: { order, name },
    });
    res.json(updatedGuruJi);
  } catch (error) {
    res.status(400).json({
      error: "Failed to update GuruJi",
      reason:
        "The request was invalid or cannot be served. This could be due to invalid input data or a conflict with existing records.",
    });
  }
};

export const deleteGuruJi = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.guruJi.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete GuruJi" });
  }
};
