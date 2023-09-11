import { sign } from "jsonwebtoken";
import User from "../../../models/model";
import { verifyPassword } from "../../../util/auth";
import connectDB from "../../../util/connectDB";
import { serialize } from "cookie";

async function handler(req,res){
    if(req.method !== "POST"){
        return;
    }
    try{
        await connectDB();
            console.log("Connected To DB");
    }catch(error){
        console.log(error)
        return res.status(500).json({
               status:"failed",
               message : "Failed to connected to DB"});
        }

        const {email,password}=req.body;
        const secretKey = process.env.SECRET_KEY;
        const expiration = 24 * 60 * 60; //HH-MM-SEC
       


        if(!email || !password){
            res.status(422).json({status:"failed" , message :"Invalid Data"});
        }

        const user = await User.findOne({email : email});
        if(!user){
            return res.status(404).json({status:"failed" , message:"User dosen't Exist!"});
        }

        const isValid = await verifyPassword(password , user.password);
        if(!isValid){
            return res.status(422).json({status:"failed" , message:"Username or Password is incorrect"});
        }

        const token =sign({email},secretKey,{expiresIn : expiration });
        const serialized = serialize("token" , token , {httpOnly : true , maxAge : expiration , path:"/"});
        res.status(200).setHeader("Set-Cookie" , serialized).json({
            status: "success",
            message :"User Logged in!",
            data : {email : user.email},
        })
        
    
}

export default handler;