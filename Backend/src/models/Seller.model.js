import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema({
    UserDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
});

export const Seller = mongoose.model("Seller",SellerSchema);