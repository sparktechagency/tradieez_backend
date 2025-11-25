import { model, Schema } from "mongoose";
import { IBlog } from "../interfaces/blog.interface";


const blogSchema = new Schema<IBlog>({
    categoryId: {
        type: Schema.Types.ObjectId,
        required: [true, "categoryId is required"],
        trim: true,
        ref: "BlogCategory"
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    view: {
        type: Number,
        trim:true,
        default:0
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



const BlogModel = model<IBlog>("Blog", blogSchema);
export default BlogModel;