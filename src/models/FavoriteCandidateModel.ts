import { model, Schema } from "mongoose";
import { IFavoriteCandidate } from "../interfaces/favouriteCandidate.interface";

const favoriteCandidateSchema = new Schema<IFavoriteCandidate>({
  employerUserId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  candidateUserId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
}, {
  timestamps: true,
  versionKey: false
}
);


const FavoriteCandidateModel = model<IFavoriteCandidate>("FavouriteCandidate", favoriteCandidateSchema);
export default FavoriteCandidateModel;