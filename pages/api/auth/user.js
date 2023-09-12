import { verify } from "jsonwebtoken";
import { verifyToken } from "../../../util/auth";

async function handler(req,res){

    if(req.method !== "GET"){
        return;
    }
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({status:"failed" , message :"You are not logged in!"})
    }
    const secretKey = process.env.SECRET_KEY;

    const result = verifyToken(token , secretKey);
     
    if(result){
        res.status(200).json({status:"success" , data : result})
    }else{
        res.status(401).json({status:"failed" , message : "You are unauthorized!"})
    }

}

export default handler;