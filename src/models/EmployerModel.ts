import { Schema, model } from "mongoose";
import { IEmployer } from "../interfaces/employer.interface";

const employerSchema = new Schema<IEmployer>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "userId is required"],
      trim: true,
      unique: true,
      ref: "User",
    },
    fullName: {
      type: String,
      required: [true, "fullName is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
      trim: true,
      maxlength: 20,
    },
    profileImg: {
      type: String,
      default: "",
    },
    ratings: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    socialMedia: {
      website: {
        type: String,
        trim: true,
        default: "",
      },
      facebook: {
        type: String,
        trim: true,
        default: "",
      },
      linkedin: {
        type: String,
        trim: true,
        default: "",
      },
      instagram: {
        type: String,
        trim: true,
        default: "",
      },
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const EmployerModel = model<IEmployer>("Employer", employerSchema);
export default EmployerModel;
