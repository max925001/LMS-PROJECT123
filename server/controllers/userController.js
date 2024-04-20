import User from "../models/userModels.js"
import AppError from "../utilis/error.util.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
import sendEmail from "../utilis/sendMail.js"
import crypto from 'crypto'
const cookieOptions = {
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development' ? true : false,
    
}
const register =async (req ,res ,next) =>{
const {fullName ,email,password} =req.body
if(!fullName || !email || !password){

    return next( new AppError('All fields are required' ,400)


)}

const userExists = await User.findOne({
    email
})
if(userExists){
return next(new AppError('Email already exits' ,400))

}
const user = await User.create({

    fullName,
    email,
    password,
    avatar:{
        public_id: email,
        secure_url:'https://res.cloudinary.com/dz6c061ci/image/upload/v1705403922/lms/ruy8ak49bzlh3n8wulyv.jpg'
    }

})

if(!user){
    return next(new AppError('user registration failed please try again' ,400))
}

// TODO file upload

if( "file",req.file){
    console.log(req.file)
    try{

        const result = await cloudinary.v2.uploader.upload(req.file.path ,{
            folder: 'lms',
            width:250,
            height:250,
            gravity:'faces',
            crop:'fill'
        })

if(result){
    user.avatar.public_id = result.public_id
    user.avatar.secure_url = result.secure_url

//remove file from server

fs.rm(`uploads/${req.file.filename}`)



}


    }catch(e){

return next(
    new AppError(error || 'file not upload ,please try again' ,500)
)


    }
}


await user.save();
user.password = undefined;

const token = await user.generateJWTtoken()
res.cookie('token' ,token ,cookieOptions)


res.status(200).json({
    success: true,
    message:'user registered successfully',
    user,
})



}

const login  = async (req,res,next) =>{


    try{



        const {email ,password} = req.body

if(!email || !password)

{
    
    return next(new AppError('All fields are required' ,400))


}
const user = await User.findOne({
    email
}).select('+password') // ye ish liye kiya hai taki password bhi mile data base se
if(!user || !user.comparePassword(password)){

return next(new AppError('Email or password does not match',400))

}

const token = await user.generateJWTtoken()
user.password = undefined
res.cookie('token' ,token ,cookieOptions)
res.status(200).json({
success: true,
message:'User Login Successfully',
user,

})



    }catch(e){
return next(new AppError(e.message,500))


    }


}




const logout = (req,res) =>{

res.cookie('token' ,null ,{
    secure:true,
    maxAge:0,
    httpOnly:true
})

res.status(200).json({
    success:true,
    message:'User Logout Successfully'

})

}


const getProfile =  async(req,res,next) =>{

    const userId = req.user.id;
try{

   
    //console("userid",userId)
    
const user = await User.findById(userId)
res.status(200).json({
    success:true,
    message:'user details',
    user
})
}catch(e){
return next(new AppError('failed to fetch profile'))

}

}


const forgetPassword = async(req,res,next) =>{

    const {email} = req.body

    if(!email){
        return next(new AppError('Email is required' ,400))

    }
const user = await User.findOne(email)
if(!user){
    return next(new AppError('Email is not registered' ,400))
 
}
//agar email verify hoga tab token generate hoga jo database me save hoga
const resetToken = await user.generatePasswordResetToken()
await user.save()
const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
const subject = 'Reset Password';
  const message = `You can reset your password by clicking <a href=${resetPasswordURL} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordURL}.\n If you have not requested this, kindly ignore.`;


  try {
    await sendEmail(email, subject, message);

    res.status(200).json({
        success: true,
        message:`Reset password token has been sent to${email}`
    })
}catch(e){
    user.forgotPasswordExpiry= undefined
    user.forgotPasswordToken=undefined
    await user.save()
return next( new AppError(e.message,500))
}


}


const resetPassword = async(req,res) =>{
const {resetToken} = req.params

const {password} =req.body

const forgetPasswordToken = crypto
.createHash('sha256')
.update(resetToken)
.digest('hex')
const user = await User.findOne({
    forgetPasswordToken,
    forgotPasswordExpiry:{$gt: Date.now()}

        
    })
    if(!user){
      return next(
        new AppError('Token is invalid or expired ,please try again',400)
      )  
    }

user.password =password

user.forgotPasswordToken =undefined
user.forgotPasswordExpiry=undefined

user.save()
res.status(200).json({
    success:true,
    message:'password changed successful'
})


}



const updateUser = async (req ,res ,next) =>{
const {fullName} = req.body
const {id} = req.params
const user = await User.findById(id)

if(!user){
return next(new AppError("Invalid user id or user does not exits"))


}
if(fullName){
user.fullName = fullName

}
if(req.file){

await cloudinary.v2.uploader.destroy(user.avatar.public_id)

try{
const result = await cloudinary.v2.uploader.upload(req.file.path ,{
folder:'lms',
width:250,
height:250,
gravity:'faces',
crop:'fill'



})

if(result){
    user.avatar.public_id = result.public_id
    user.avatar.secure_url =result.secure_url
    fs.rm(`uploads/${req.file.filename}`)
}


}catch(error){
    new AppError(error || 'file not uploades , please try again' ,400)


}


await user.save()
res.status(200).json({
    success:true,
    message:'User details update successfully'
})

}

}

export{
register,
login,
logout,
getProfile,
forgetPassword,
resetPassword,
updateUser


}