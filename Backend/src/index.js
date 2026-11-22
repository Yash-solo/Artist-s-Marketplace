import { connectDB } from "./database/db.js";
import "dotenv/config"

connectDB()
.then((res)=>{
    console.log("Resolved!");
    
}).catch((err)=>{
    console.log("Error came:- ",err.message);
})