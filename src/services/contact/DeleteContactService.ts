import CustomError from "../../errors/CustomError";
import ContactModel from "../../models/ContactModel";
import isNotObjectId from "../../utils/isNotObjectId";


const DeleteContactService = async (contactId: string) => {
  if (isNotObjectId(contactId)) {
    throw new CustomError(400, "contactId must be a valid ObjectId")
  }
  const contact = await ContactModel.findById(contactId);
  if(!contact){
    throw new CustomError(404, "contactId Not Found");
  }
  const result = await ContactModel.deleteOne({ _id:contactId });
  return result;
};

export default DeleteContactService;