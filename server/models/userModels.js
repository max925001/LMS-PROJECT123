

import { Schema,model } from "mongoose";
import bcrypt from 'bcryptjs'
// import pkg from 'jsonwebtoken'
// const {jwt} = pkg
import  Jwt  from "jsonwebtoken";
import crypto from 'crypto'

const userSchema = new Schema({


fullName:{

type: String,
required:[true,'name is required'],
minLength:[5,'Name must be at least 5 charcter'],
maxLength:[100, 'name should be less 100 charcter'],
lowercase: true,
trim:true




},
email:{

   type: String ,
   required:[true,'email is required'],
   lowercase:true,
   trim:true,
   unique:true,

},
password:{
    type: String,
    required:[true,'password is required'],
minLength:[8,'Password must be 8 character'],
select:false

},
avatar:{
    public_id:{
        type:String
    },
    secure_url:{
        type:String
    }
},


role:{
    type:String,
    enum:['USER' ,'ADMIN'],
    default: 'USER'
},

forgotPasswordToken: String,
forgotPasswordExpiry:Date




},{timestamps: true})


userSchema.pre('save' , async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password =  await bcrypt.hash(this.password,10)
})

userSchema.methods ={
    generateJWTtoken:  async function(){
        return await Jwt.sign(
            {
                id: this._id ,email: this.email,
                subscription: this.subscription,
                role: this.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    }
,
comparePassword: async function(plaintextPassword){

    return  await bcrypt.compare(plaintextPassword,this.password)
},
generatePasswordResetToken: async function(){

    const resetToken = crypto.randomBytes(20).toString('hex')

this.forgotPasswordToken =crypto
.createHash('sha256')
.update(resetToken)
.digest('hex')
this.forgotPasswordExpiry = Date.now() *15*60*60*1000
return resetToken
}


}

const User = model('User' , userSchema)

export default User