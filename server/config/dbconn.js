import mongoose from "mongoose";
import { config } from "dotenv";
config()
mongoose.set('strictQuery' ,false)
const MONGODB_URL =process.env.MONGO_URL

const connectToDb = async () =>{
    try{
 const {connection}= await mongoose.connect("mongodb+srv://mongoDb:mongo925@cluster0.f6juaqh.mongodb.net/learningproject1" )

if(connection){
    console.log(`MongoDb connected succesfully ${connection.host}`)
}

    }catch(e){

        console.log(e)
        process.exit(1)
    }


}

export default connectToDb