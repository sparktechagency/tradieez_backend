/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
//import { v2 as cloudinary } from "cloudinary";
import cloudinary from "./cloudinary";
import CustomError from "../errors/CustomError";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Tradieez/cv",
    resource_type: "raw", // REQUIRED
    public_id: () => {
      //   const fileName = file.originalname
      //     .replace(/\.[^/.]+$/, "") // remove extension
      //     .replace(/\s+/g, "-"); // replace spaces
      return `Tradieez_${Date.now()}`;
    },
    format: "pdf",
  } as any,
});

export const uploadCV = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      // "application/msword",
      //"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new CustomError(400, "Only PDF files are allowed"));
    }
  },
});
