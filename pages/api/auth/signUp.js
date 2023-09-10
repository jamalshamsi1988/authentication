
import User from '../../../models/model';
import { hashPassword } from '../../../util/auth';
import connectDB from '../../../util/connectDB';
import User from '../../../models/model';


async function handler(req,res){

    if(req.method !== "POST") {return};

    try{
            await connectDB();
            console.log("Connect To DB")
    }catch(error){
        console.log(error)
     return res.status(500).json({
            status:failed,
            message : "Failed to connected to DB"
         });
    }

    const {email , password}=req.body;
    if(!email || !password){
        return res.status(422).json({status:"failed" , message : "Invalid data"})
    }
    const existingUser = await User.findOne({email : email});
    if(existingUser){
        return res.status(422).json({status : "failed" , message :"Existing User Already"})
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({email:email , password : hashedPassword});
    res.status(201).json({status :"success" , message : "User Created!"})
}

export default handler;