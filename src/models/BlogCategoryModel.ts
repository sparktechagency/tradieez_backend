import { model, Schema } from "mongoose";
import { IBlogCategory } from "../interfaces/blogCategory.interface";


const blogCategorySchema = new Schema<IBlogCategory>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['visible', 'hidden'],
        default: "visible"
    },
}, {
    timestamps: true,
    versionKey: false
})



const BlogCategoryModel = model<IBlogCategory>("BlogCategory", blogCategorySchema);
export default BlogCategoryModel;