
import { verifyToken, verifyPassword } from '../../../util/auth';
import connectDB from './../../../util/connectDB';
import User from './../../../models/model';

async function handler(req,res){
        if(req.method !== "POST") return;
        
        if(req.method !== "POST") {return};

        try{
                await connectDB();
                console.log("Connect To DB")
        }catch(error){
            console.log(error)
         return res.status(500).json({
                status:"failed",
                message : "Failed to connected to DB"
             });
        }

        const {name , lastName , password} = req.body;
        const {token} = req.cookies;
        const secretKey = process.env.SECRET_KEY;
        

        if(!token){
            return res.status(401).json({status:"failed" , message :"You are not logged in!"})
        }

        const result = verifyToken(token , secretKey);
        if(!result){
            return res.status(401).json({status:"failed" , message : "You are unauthorized!"})
        }
        const user = await User.findOne({email : result.email});
        if(!user){
            return res.status(404).json({status : "failed" , message : "User dosen't exist"});
        }

        const isValid = await verifyPassword(password , user.password);
        if(!isValid){
            return res.status(422).json({status : "failed" , message : "Password incorrect"});
        }

        user.name = name ;
        user.lastName = lastName;
        user.save();
        res.status(200).json({
            status : "success" ,
           data :{ name , lastName , email : result.email}
        });

}

export default handler;