import express from "express";
import {User} from '../modals/UserSchema.js'
import bcrypt from 'bcrypt';

const router=express.Router();


import { verifyAdmin } from "./auth.js";

router.post('/register',async(req,res)=>{
   
    try{
        const {username,email,password,phoneNumber}=req.body;
        const user=await User.findOne({username});
        if(user){ 
            return res.json({message : "user registered Successfully"});
        }
        const hashPassword=await bcrypt.hashSync(password,10);

        const newUser=new User({
            username,
            email,
            password : hashPassword,
            phoneNumber
        })
        await newUser.save();
        return res.json({registered : true});
    }
    catch(err){
        console.log(err)
        return res.json({message : err}) 
    }

})

export {router as UserRouter}