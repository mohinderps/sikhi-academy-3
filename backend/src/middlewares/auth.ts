import { Request, Response, NextFunction } from "express";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const adminToken = process.env.ADMIN_TOKEN;
  const providedAdminToken = req.headers["x-admin-token"];

  const isAdmin = adminToken === providedAdminToken;

  if (isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
