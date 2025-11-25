import BlogCategoryModel from "../../models/BlogCategoryModel";

const GetBlogCategoryDropDownService = async () => {
    const result = await BlogCategoryModel.find({ status: "visible" }).select('_id name').sort('-createdAt');
    return result;
}

export default GetBlogCategoryDropDownService;