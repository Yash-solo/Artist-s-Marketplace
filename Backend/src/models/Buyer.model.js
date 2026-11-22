import mongoose from 'mongoose';

const BuyerSchema = new mongoose.Schema({
    UserDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
});

export const Buyer = mongoose.model("Buyer",BuyerSchema);