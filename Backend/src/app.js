import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
app.use(cookieParser());

//production grade cookies me credientials true  dena mendotary h . 
app.use(cors({
    origin: 'http://localhost:5173', // Tumhara Vite/React frontend URL
    credentials: true
}));
export {app}