import {User} from "../Models/User.js";
import  Jwt from 'jsonwebtoken'

export const Authenticate = async (req, res, next) => {
    const token = req.header("Auth")
    try{
        if(!token) return res.json({message:"Login first"})

            const decode = Jwt.verify(token, "!@#$%^&*()");

        //console.log(decode)

        const id = decode.userId

        let user = await User.findById(id)//.select("-password")


        if (!user) return res.json({message:"User not exists"})
        req.user = user




        next();


    }catch(error){
        res.json({message:error})
        
    }

}