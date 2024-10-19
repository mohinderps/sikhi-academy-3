import { Request, Response } from "express";
import { guruJiService } from "../services/guruJi.service";
import { CreateGuruJiDto, UpdateGuruJiDto } from "../types";
import { GuruJi } from "@prisma/client";

export const getAllGuruJis = async (req: Request, res: Response) => {
  try {
    const allGuruJis: GuruJi[] = await guruJiService.getAllGuruJis();
    res.json(allGuruJis);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Guru jis" });
  }
};

export const getGuruJiById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const guruJi: GuruJi | null = await guruJiService.getGuruJiById(id);
    if (guruJi) {
      res.json(guruJi);
    } else {
      res.status(404).json({ error: "Guru ji not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Guru ji" });
  }
};

export const addGuruJi = async (req: Request, res: Response) => {
  try {
    const { order, name }: CreateGuruJiDto = req.body;
    const newGuruJi: GuruJi = await guruJiService.addGuruJi({ order, name });
    res.status(201).json(newGuruJi);
  } catch (error) {
    res.status(400).json({ error: "Failed to add Guru ji" });
  }
};

export const updateGuruJi = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { order, name }: UpdateGuruJiDto = req.body;
    const updatedGuruJi: GuruJi = await guruJiService.updateGuruJi(id, {
      order,
      name,
    });
    res.json(updatedGuruJi);
  } catch (error) {
    res.status(400).json({
      error: "Failed to update Guru ji",
    });
  }
};

export const deleteGuruJi = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await guruJiService.deleteGuruJi(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete Guru ji" });
  }
};
