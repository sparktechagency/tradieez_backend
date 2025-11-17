/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from "../helper/cloudinary";

const uploadToCloudinary = async (path: string) => {
  try { 
    const result = await cloudinary.uploader.upload(path, {
      folder: 'Tradiezz',
    });
    return result.secure_url;

  } catch (err:any) {
    throw new Error(err);
  }
};

export default uploadToCloudinary;
