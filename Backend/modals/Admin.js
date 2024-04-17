import mongoose from "mongoose";

const adminSchema= new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique:true
    },
    password : {
        type: String ,
        required : true
    }
})

const adminModal=mongoose.model('Admin',adminSchema);

export  {adminModal as Admin}