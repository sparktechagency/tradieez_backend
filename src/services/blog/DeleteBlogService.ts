import CustomError from "../../errors/CustomError";
import BlogModel from "../../models/BlogModel";
import isNotObjectId from "../../utils/isNotObjectId";

const DeleteBlogService = async (blogId: string) => {
    if (isNotObjectId(blogId)) {
        throw new CustomError(400, "blogId must be a valid ObjectId")
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
        throw new CustomError(404, 'blogId not found');
    }

    const result = await BlogModel.deleteOne({ _id: blogId})
    return result;
}

export default DeleteBlogService;