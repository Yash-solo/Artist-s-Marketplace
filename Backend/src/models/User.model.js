import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
     type: String,
     required: true 
  },
  username: { type: String, unique: true, lowercase: true }, // e.g., "rahul_art" -> link banega
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'artist'], default: 'buyer' },
  avatar: { type: String, default: '' },
  
  // Sirf Artists ke liye fields
  bio: { type: String, maxLength: 250 },
  city: { type: String }, // Shipping estimate ke liye
  artStyles: [{ type: String }], // e.g., ['Pencil Sketch', 'Charcoal', 'Watercolor']
  isAvailableForCustom: { type: Boolean, default: true },
  startingPrice: { type: Number }, // Filter mein dikhane ke liye (e.g., 599)
  avgDeliveryDays: { type: Number, default: 5 },
  
  // Payout details (Jab order complete hoga tab paisa bhejne ke liye)
  upiId: { type: String },
  completedOrdersCount: { type: Number, default: 0 } // Followers ki jagah yeh trust dikhayega!
}, { timestamps: true });

export const User = mongoose.model("User",UserSchema);