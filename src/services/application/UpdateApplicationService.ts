import CustomError from "../../errors/CustomError";
import { IApplication } from "../../interfaces/application.interface";
import ApplicationModel from "../../models/ApplicationModel";
import isNotObjectId from "../../utils/isNotObjectId";

const UpdateApplicationService = async (loginEmployerUserId: string, applicationId: string, payload: Partial<IApplication>) => {
    if (isNotObjectId(applicationId)) {
        throw new CustomError(400, "applicationId must be a valid ObjectId")
    }

    //check application
    const application = await ApplicationModel.findOne({
        _id: applicationId,
        employerUserId: loginEmployerUserId
    });
    if (!application) {
        throw new CustomError(404, 'Application not found with the provided ID');
    }


    //update application
    const result = await ApplicationModel.updateOne(
        {
            _id: applicationId,
            employerUserId: loginEmployerUserId
        },
        payload,
        { runValidators: true }
    )

    return result;
}

export default UpdateApplicationService