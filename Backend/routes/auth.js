import express from 'express';
import {Admin} from '../modals/Admin.js';
import {User} from '../modals/UserSchema.js';
import jwt,{decode} from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router=express.Router();

router.post('/login',async(req,res)=>{
    console.log(req.body);
    try{
        const{username,password,role}=req.body;
        if(role==='admin'){
            const admin=await Admin.findOne({username});
            if(!admin){
                return res.json({message : "admin not registered"});
            }
            const validPassword=await bcrypt.compare(password,admin.password);
            if(!validPassword){
                return res.json({message : "wrong Password"});
            }
            const token=jwt.sign({username:admin.username,role:'admin'},
        process.env.Admin_key);

        res.cookie('token', token , {httpOnly : true,secure : true});
            return res.json({login:true , role:'admin'}) ;
            
        }
        else if(role==='user'){
            console.log("yhn tk ")
            const user=await User.findOne({username});
            console.log(user)
            if(!user){
                return res.json({message : "User Not registered with this mail id"})
            }
            const validPassword = await bcrypt.compare(password,user.password);
            if(!validPassword){
                console.log("dfbfgn")
                return res.json({message:"wrong Password"})
            }
            const token = jwt.sign({username : user.username ,role: 'user' }, process.env.User_Key)
            console.log(token)
            res.cookie('token', token , {httpOnly : true,secure : true});
            return res.json({login:true , role:'user'})
        }
        else{

        }
    }
    catch(err){
        console.log(err);
        res.json(err);
    }

})

const verifyAdmin=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.json({message : "Invalid Admin"});
    }
    else{
        jwt.verify(token,process.env.Admin_key ,(err,decoded)=>{
            if(err){
                return res.json({message : "Invalid Token"});
            }
            else{
                req.username=decoded.username;
                req.role=decode.role;
                next()   //it will basically bring us back where we called it
            }
        })
    }
}

const verifyUser=(req,res,next)=>{
    const token =req.cookies.token;
    if(!token){  // yeh token ko check kargea ki bo valid hai ya nhii
        return res.json({message : "Invalid User"});
    }
    else{
        jwt.verify(token,process.env.Admin_key ,(err,decoded)=>{
            if(err){
                // this is for verifing student if error come it means there is not admin
                jwt.verify(token,process.env.User_Key ,(err,decoded)=>{
                    if(err){
                        return res.json({message : "Invalid Token"});
                    }
                    else{
                        req.username=decoded.username;
                        req.role=decoded.role;
                        next()   //it will basically bring us back where we called it
                    }
                })
            }
            else{
                req.username=decoded.username;
                req.role=decoded.role;
                next()   //it will basically bring us back where we called it
            }
        })
    }
}


router.get('/verify',verifyUser,(req,res)=>{
    return res.json({login:true , role: req.role});
})
router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({logout:true});
})
export {router as AdminRouter,verifyAdmin};