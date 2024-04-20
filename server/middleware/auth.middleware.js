import { token } from "morgan"
import AppError from "../utilis/error.util.js"
import jwt from "jsonwebtoken"

const isLoggedIn = async (req ,res, next) =>{

     const {token} =req.cookies


    // const {token} = req.cookies
    console.log("token",token)
    if(!token){
       
        return next(new AppError('Unauthenticated please login',400))
    }
    //console.log(token)

const userDetails =  await jwt.verify(token,process.env.JWT_SECRET)

req.user = userDetails;
console.log("userdetails",req.user)
next()
}




const authorizedRoles = (...roles) => async(req,res,next)=>{
const currentUserRole = req.user.role

if(!roles.includes(currentUserRole)){
return next(
    new AppError('You do not have permission to access')
)

}
next()

}









export{
    isLoggedIn    
    ,authorizedRoles 
}