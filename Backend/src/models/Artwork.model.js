import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema({
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  
  // Images & Human-Made Proof
  imageUrl: { type: String, required: true }, // Main finished artwork
  proofUrl: { type: String, required: true }, // Pencil/brush ke saath WIP photo ya timelapse link
  
  // Categorization & Filters (No algorithm bias)
  category: { 
    type: String, 
    enum: ['Pencil Sketch', 'Charcoal', 'Watercolor', 'Oil Painting', 'Digital Art', 'Mandala'],
    required: true 
  },
  size: { type: String, required: true }, // e.g., "A4", "A3", "12x16 inches"
  
  // Listing Type
  listingType: { 
    type: String, 
    enum: ['portfolio_sample', 'ready_to_ship'], 
    default: 'portfolio_sample' 
  },
  price: { type: Number, required: true }, // Agar sample hai toh "Starting at ₹X"
  isSold: { type: Boolean, default: false }
}, { timestamps: true });


export const Artwork = mongoose.model("Artwork",artworkSchema);