import { Schema, model } from 'mongoose';
import { IAdmin } from '../interfaces/admin.interface';

const adminSchema = new Schema<IAdmin>({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "userId is required"],
        trim: true,
        unique: true,
        ref: "User"
    },
    fullName: {
        type: String,
        required: [true, "fullName is required"],
        trim: true,
        minlength: 2,
        maxlength: 100
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
            message: props => `${props.value} is not a valid email address`
        }
    },
    phone: {
        type: String,
        required: [true, "phone is required"],
        trim: true,
        maxlength: 20
    },
    profileImg: {
        type: String,
        default: ""
    }
}, {
    timestamps: true,
    versionKey: false
})

const AdminModel = model<IAdmin>('Admin', adminSchema);
export default AdminModel;
