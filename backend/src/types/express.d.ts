import { Request } from "express";
import { ImageUrls } from "../admin/saakhi/admin.saakhi.types";

declare global {
  namespace Express {
    interface Request {
      imageUrls?: ImageUrls;
    }
  }
}
