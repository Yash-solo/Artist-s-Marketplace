import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  unboxingPhotoUrl: { type: String } // Buyer asli painting ki photo daal sake
}, { timestamps: true });

export const Review = mongoose.model("Review",reviewSchema);