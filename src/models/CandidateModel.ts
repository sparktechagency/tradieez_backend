import { Schema, model } from 'mongoose';
import { ICandidate } from '../interfaces/candidate.interface';

const candidateSchema = new Schema<ICandidate>({
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
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: [true, "categoryId is required"],
        trim: true,
        ref: "Category"
    },
    subCategoryId: {
        type: Schema.Types.ObjectId,
        required: [true, "subCategoryId is required"],
        trim: true,
        ref: "SubCategory"
    },
    ratings: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    workRate: {
        type: String,
        required: true,
        enum: ['per_hour', 'per_day', 'per_job'],
    },
    workType: {
        type: String,
        required: true,
        enum: ['full_time', 'part_time', 'gig', 'evenings_weekends'],
    }, 
    availableDate: {
        type: Date,
        required: true,
    }, 
    employmentType: {
        type: String,
        required: true,
        enum: ['self_employed', 'seeking_employed', 'both'],
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'type' must be "Point"
            required: true,
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
    address: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
        validate: {
            validator: (v: string[]) => v.length > 0,
            message: "At least one skill is required"
        }
    },
    experience: {
        type: String,
        required: true,
        enum: ['entry', 'mid', 'senior', 'expert'],
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: ''
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const CandidateModel = model<ICandidate>('Candidate', candidateSchema);
export default CandidateModel;
