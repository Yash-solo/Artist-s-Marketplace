import { User } from "../models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "KeyisHaha";

export const signIn = async(req,res)=>{
    const {Email,Password} = req.body;
    try{
        //get user from database
        const user = await User.findOne({email:Email});
        if(!user) return res.status(400).json({message:"User not found"});
    
        //compare password
        // const isMatch = await bcrypt.compare(Password,user.password);
        // if(!isMatch) return res.status(400).json({message:"Wrong password try again"});
    
        //Token banao (jisme user ki _id chhupi hogi)
        const token = jwt.sign({id: user._id},SECRET_KEY,{expiresIn:'7d'});
        //Browser mein httpOnly Cookie SET karo
        res.cookie("User_Token",token,{
            httpOnly:true,//not any js can touch it.
            sameSite:'lax',//localhost pr ports ke liye
            maxAge:1000*60*60*24*7// max age is 7 days
        })
    
        res.status(200).json({success:true,role:user.role});

    }catch(err){
        res.status(500).json({message:"Error message"});
    }
}

//get profile data from mongodb by token
export const getMyprofile = async(req,res)=>{
    try{

        //browser ki cookie's me se token nikalo
        const token = req.cookies.User_Token;
        console.log("token:- ",token);

        if(!token){
            return res.status(401).json({
                message:"Please login first"
            })
        }

        // Token khol kar user ki ID nikalo
        const decoded = jwt.verify(token,SECRET_KEY);
        console.log("Decoded:- ",decoded);

        // Database se us ID ka poora data lao (password chhod kar)
        const user = await User.findById(decoded.id).select('-password');

        //frontend ko databhejna
        res.status(200).json({success:true,user})
    }catch(err){
        console.log(err.message);
        res.status(401).json({ message:"Invalid Token" })
    }
}

export const changeUserData = async(req,res)=>{
    console.log(req.body);
    const updateUser = await User.updateOne({name:req.body.name},{
        $set:req.body
    });
    if(updateUser===null){
        return "No user Found";
    }
}