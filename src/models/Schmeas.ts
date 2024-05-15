import { UUID } from "mongodb";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DB_URL || "").then(()=>{
    console.log('your schemas is connected to mongoDB')
});

const urlSchema = new mongoose.Schema({
    id: UUID,
    url: String,
})

export const URLS = mongoose.model('url', urlSchema);