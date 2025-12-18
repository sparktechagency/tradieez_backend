/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "../../errors/CustomError";
import { IUpdateCandidatePayload } from "../../interfaces/candidate.interface";
import CandidateModel from "../../models/CandidateModel";
import SubCategoryModel from "../../models/SubCategoryModel";
import uploadToCloudinary from "../../utils/uploadToCloudinary";


const UpdateCandidateProfileService = async (loginUserId: string, req:any, payload: Partial<IUpdateCandidatePayload>) => {
    const { subCategoryId, longitude, latitude } = payload;

    //check sub category
    if (subCategoryId) {
        const subCategory = await SubCategoryModel.findById(subCategoryId);
        if (!subCategory) {
            throw new CustomError(404, 'Sorry, subCategoryId not found');
        }
        //set categoryId
        payload.categoryId=subCategory.categoryId;
    }

    //check longitude & latitude
    if (longitude && latitude) {
        payload.location = {
            type: "Point",
            coordinates: [longitude, latitude]
        }
    }

    //if image is available
    if (req.file) {
        payload.profileImg = await uploadToCloudinary(req?.file?.path as string, "candidate");
    }

    //update the candidate
    const result = await CandidateModel.updateOne(
        { userId: loginUserId},
        payload
    )

    return result;
}

export default UpdateCandidateProfileService;