import { Request, Response } from "express";
import { guruJiService } from "../services/guruJi.service";

export const getAllGuruJis = async (req: Request, res: Response) => {
  try {
    const allGuruJis = await guruJiService.getAllGuruJis();
    res.json(allGuruJis);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Guru jis" });
  }
};

export const getGuruJiById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const guruJi = await guruJiService.getGuruJiById(id);
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
    const { order, name } = req.body;
    const newGuruJi = await guruJiService.addGuruJi({ order, name });
    res.status(201).json(newGuruJi);
  } catch (error) {
    res.status(400).json({ error: "Failed to add Guru ji" });
  }
};

export const updateGuruJi = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { order, name } = req.body;
    const updatedGuruJi = await guruJiService.updateGuruJi(id, { order, name });
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
