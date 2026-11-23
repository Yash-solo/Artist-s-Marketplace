import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  orderType: { type: String, enum: ['custom_commission', 'ready_artwork'], required: true },
  artworkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }, // Optional (agar ready art kharida hai)
  
  // Custom Commission Details
  referencePhotoUrl: { type: String }, // Buyer jo photo banwana chahta hai
  size: { type: String, required: true }, // e.g., "A4 Single Face", "A3 Couple"
  customNotes: { type: String }, // e.g., "Background plain rakhna"
  
  // Milestone & Tracking Status
  status: {
    type: String,
    enum: [
      'pending_payment',
      'accepted_by_artist',
      'outline_uploaded',   // Artist ne rough sketch dikhaya
      'in_progress',        // Buyer ne approve kar diya, ab shading chal rahi hai
      'shipped',            // Courier kar diya
      'delivered',          // Buyer ko mil gaya -> Paisa release hoga
      'cancelled'
    ],
    default: 'pending_payment'
  },
  outlinePreviewUrl: { type: String }, // Artist rough outline upload karega
  trackingLink: { type: String },
  shippingAddress: {
    fullName: String,
    phone: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: String
  },
  
  // Financials
  totalAmount: { type: Number, required: true },
  platformFee: { type: Number, required: true }, // e.g., 10%
  artistEarning: { type: Number, required: true }, // 90%
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  isPayoutDone: { type: Boolean, default: false }
}, { timestamps: true });



export const Order = mongoose.model("Order",orderSchema);