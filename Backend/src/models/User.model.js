import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        minlength:2,
    },
    email:{
        type: String,
        required:true,
        lowercase:true,
    },
    address:{
        type: String,
        required:true,
    },
    mobileno:{
        type: String,
        required:true,
        length:10
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    likedCate:{
        type: String,
        required:true,

    },
    BirthdayDate:{
        type:String,
        required:true,
    },
    State:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Buyer","Seller"],
        required:true,
    },
    savedArtist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Artist",
    },
    PaymentDetails:{
        type:mongoose.Schema.Type.ObjectId,
        ref:"Payment"
    },
});

export const User = mongoose.model("User",UserSchema);