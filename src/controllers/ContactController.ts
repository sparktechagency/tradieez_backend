import { ContactValidFields } from "../constant/contact.constant";
import CreateContactService from "../services/contact/CreateContactService";
import GetContactsService from "../services/contact/GetContactsService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";

const createContact = asyncHandler(async (req, res) => {
    const result = await CreateContactService(req.body);
    res.status(200).json({
        success: true,
        message: "Your contact information has been submitted successfully.",
        data: result
    })
})

const getContacts = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, ContactValidFields);
    const result = await GetContactsService(validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Contacts are retrieved successfully',
        meta: result.meta,
        data: result.data,
    })
})



const ContactController = {
    createContact,
    getContacts
}

export default ContactController;