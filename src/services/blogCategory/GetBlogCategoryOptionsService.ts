import BlogCategoryModel from "../../models/BlogCategoryModel";

const GetBlogCategoryOptionsService = async () => {
    const result = await BlogCategoryModel.find().select('_id name').sort('-createdAt');
    return result;
}

export default GetBlogCategoryOptionsService;