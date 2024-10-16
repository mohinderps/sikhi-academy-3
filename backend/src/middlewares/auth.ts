import { Request, Response, NextFunction } from "express";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const isAdmin = true;
  if (isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
