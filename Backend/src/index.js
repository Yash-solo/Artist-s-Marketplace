import { connectDB } from "./database/db.js";
import mongoose from 'mongoose';
import { signIn, getMyprofile } from "./controllers/authController.js";
import { User } from "./models/User.model.js";
import { app } from "./app.js";
import "dotenv/config"
import { DB_Name } from "./constant.js";

connectDB()
.then((res)=>{
    console.log("Resolved!");
    //get post request on sign up page and store data in sign in /
    app.post("/signup",async(req,res)=>{
        const userData = req.body;
        
        const newuser = new User({
            ...userData.information,
            role:userData.Role
        })
        console.log("There is a user:- ",newuser);
        const savedUser = await newuser.save();

        console.log(savedUser);//saved user

        res.status(200).json({
            success:true,
            message:"Account created successsfully",
        })

    })

    app.post("/signin",signIn);

    app.get("/Profile", getMyprofile);

    app.listen(process.env.PORT,()=>{
        console.log("App is listening at localhost:",process.env.PORT);
    })
    
}).catch((err)=>{
    console.log("Error came:- ",err.message);
})