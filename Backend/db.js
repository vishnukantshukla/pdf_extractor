import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const Connection =async()=>{
    try{
        mongoose.connect(process.env.URL)
        console.log("Database connected suceesfully");
    }
    catch(err){
        console.log("Error : "+err);
    }
}

Connection();