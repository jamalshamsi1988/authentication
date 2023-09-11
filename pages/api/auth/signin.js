import User from "../../../models/model";
import connectDB from "../../../util/connectDB";

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
               status:failed,
               message : "Failed to connected to DB"});
        }

        const {email,password}=req.body;
        if(!email || !password){
            res.status(422).json({status:"failed" , message :"Invalid Data"});
        }

        const user = await User.findOne({email : email});
        res.status(422).json({status:"failed" , message:"User dosen't Exist!"});
    
}

export default handler;