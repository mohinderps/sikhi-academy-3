import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import s3Client from "../config/s3-client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

async function uploadToS3(buffer: Buffer, key: string, mimetype: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: mimetype,
  });

  await s3Client.send(command);
  return `https://${process.env.CLOUDFRONT_DOMAIN}/${key}`;
}

export const processAndUploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next();
  }
  try {
    const originalImage = sharp(req.file.buffer);
    const metaData = await originalImage.metadata();

    const desktopBuffer = await originalImage
      .resize({
        width: 1200,
        withoutEnlargement: true,
      })
      .toBuffer();

    const mobileBuffer = await originalImage
      .resize({
        width: 400,
        withoutEnlargement: true,
      })
      .toBuffer();

    const timestamp = Date.now();
    const desktopKey = `saakhi-images/desktop-${timestamp}.${metaData.format}`;
    const mobileKey = `saakhi-images/mobile-${timestamp}.${metaData.format}`;

    const [desktopImageUrl, mobileImageUrl] = await Promise.all([
      uploadToS3(desktopBuffer, desktopKey, req.file.mimetype),
      uploadToS3(mobileBuffer, mobileKey, req.file.mimetype),
    ]);

    req.imageUrls = {
      desktopImageUrl,
      mobileImageUrl,
    };

    next();
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Failed to process and upload image" });
  }
};
