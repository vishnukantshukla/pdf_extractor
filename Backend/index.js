import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser  from "cookie-parser";
import "./db.js";
import pdfSchem from './modals/pdfDetails.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

import axios from "axios";

import { AdminRouter } from "./routes/auth.js";
import { UserRouter } from "./routes/userRoute.js";


import multer from "multer";
import mongoose from "mongoose";
const app = express();
dotenv.config()
// AIzaSyDRCdx7LyMTZqqlMmE7y7pb_hEAosn4eww

app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));
 
app.use("/files",express.static("files"));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix+file.originalname )
    }
  });

const pdfSchema=mongoose.model("pdfDetails");
  const upload = multer({ storage: storage })

app.post("/upload-files",upload.single("file"),async (req,res)=>{
    console.log(req.file);
    const title=req.body.title;
    const fileName=req.file.filename;
    try{
        await pdfSchema.create({title:title , pdf : fileName});
        res.send({status : "OK"});
    }
    catch(error){
        res.json({status : error});
    }
})
 app.post("/summarize_the_data",async(req,res)=>{
  console.log(req.body)
  const {msg}=req.body
    try {
     const genAI = new GoogleGenerativeAI(" AIzaSyDRCdx7LyMTZqqlMmE7y7pb_hEAosn4eww");

async function run() {

  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `summarize the message ${msg}`

  const result = await model.generateContent(prompt);
  const response = await result.response;
 
  const text = response.text(); 
  console.log(text) 
  return res.status(200).json({message:text}) 
}
run();
        
    } catch (err) {
        console.log(err);
        return res.status(500).send({message:err});
  }

 })
app.use(cookieParser());


app.use('/auth', AdminRouter);
app.use('/user', UserRouter);

app.get("/get-files",async(req,res)=>{
    try{
        pdfSchema.find({}).then((data)=>{
            res.send({status : "ok" , data : data})
        });
    }
    catch(error){

     }
    
});

// Start the server on the specified port, or default to 3000 if PORT is not set
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 
