import mongoose from 'mongoose';
import { DB_Name } from '../constant.js';

const connectDB = async()=>{
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
        console.log("Database connected successfully HOST:- ",db.connection.host);
    } catch (error) {
        console.log("Database connection error:- ",error);
        
    }

}

export {connectDB};