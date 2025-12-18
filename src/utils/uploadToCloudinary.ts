/* eslint-disable @typescript-eslint/no-explicit-any */

import cloudinary from "../helper/cloudinary";

type TFolder = 'employer' | 'candidate' | 'admin' | 'company_logo' | 'category' | 'blog' | 'banner' ;

const uploadToCloudinary = async (path: string, folder: TFolder) => {
  try { 
    const result = await cloudinary.uploader.upload(path, {
      folder: `Tradieez/${folder}`,
    });
    
    return result.secure_url;

  } catch (err:any) {
    throw new Error(err);
  }
};

export default uploadToCloudinary;