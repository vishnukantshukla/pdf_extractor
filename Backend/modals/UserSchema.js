import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique:true
    },
    email:{
        type:String,
        required : true,
        required:true
    },
    password : {
        type: String ,
        required : true
    },
    phoneNumber:{
        type:String,
        required:true,

    }
})

const UserModal=mongoose.model('User',UserSchema);

export  {UserModal as User};