import { model, Schema } from "mongoose";
import { ISubCategory } from "../interfaces/subCategory.interface";


const subCategorySchema = new Schema<ISubCategory>({
    categoryId: {
        type: Schema.Types.ObjectId,
        required: [true, "categoryId is required"],
        trim: true,
        ref: "Category"
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
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



const SubCategoryModel = model<ISubCategory>("SubCategory", subCategorySchema);
export default SubCategoryModel;