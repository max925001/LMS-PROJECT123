
import Course from "../models/course.model.js"
import AppError from "../utilis/error.util.js"
//import { isLoggedIn } from "../middleware/auth.middleware.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
const getAllCourses = async(req,res,next) =>{

const courses = await Course.find({}).select('-lectures')
try{
res.status(200).json({
    success:true,
    message:'All course',
    courses
})

}catch(e){


return next(new AppError(e.message,500))

}

}

const getLecturesByCourseId =async(req,res,next) =>{

try{

const {id} = req.params
console.log(id)
const course = await Course.findById(id)

if(!course){
    return next(
        new AppError('Invalid course id',400))
}

res.json({
   success: true,
   message:'course lectures fetched successfully',
   lectures: course.lectures
})

}catch(e){
return next(
    new AppError(e.message,500)
)
}


}





const createCourse = async(req,res,next) =>{

const {title ,description ,category ,createdBy} = req.body

if(!title || !description || !category || !createdBy){


    return next(
        new AppError('All fields are required' ,400)
    )
}


const course = await Course.create({
    title,
    description,
    category,
    createdBy
,thumbnail:{
    public_id:'Dummy',
    secure_url:"Dummy"
    
        
    
    
    
       
    
    }

})
if(!course){
    return next(
        new AppError('Course could not created please try again',400)
    )
}

if(req.file){

const result = await cloudinary.v2.uploader.upload(req.file.path ,{

    folder: 'lms'
})

if(result){
course.thumbnail.public_id = result.public_id
course.thumbnail.secure_url = result.secure_url

}

fs.rm(`uploads/${req.file.filename}`)

}



 await course.save()

 res.status(200).json({
    success: true,
    message:'Course created successful',
    course
 })

}


const updateCourse = async(req,res,next) =>{



    try{

        const { id} = req.params
        
        const course = await Course.findByIdAndUpdate(
           id,
           {
            $set: req.body // use for overwrite
           } ,
           {
            runValidators: true // use for data validation 
           }
        )
        
        
        if(!course){
        
        
            return next(
                new AppError('Course with given id does not exist', 500))
        
        }
        
        res.status(200).json({
        success: true,
        message: 'Course update successfully',
        course
        
        })
        
        
        }catch(e){
        
        return next(
            new AppError(e.message, 500)
        )
        }
        





}
const removeCourse = async(req,res,next) =>{

try{

const { id} = req.params

const course = await Course.findById(
  id
)

if(!course){
    return next(
        new AppError('course with given id does not exist' ,500)
    )
}


await Course.findByIdAndDelete(id)

res.status(200).json({
    success: true,
    message:'Course deleted successfully'
})



}catch(e){

return next(
    new AppError(e.message, 500)
)
}


}





const addLectureToCourseById = async(req,res,next) =>{
try{

    const {title, description} =req.body
    const {id} = req.params
    if(!title || !description){
        return next(
            new AppError('All fields are required' ,400)
        )
    }
    const course = await Course.findById(id)

if(!course){
    return next(
        new AppError('Course with given id does not exist' ,500)
    )
}

const lectureData = {
    title,
    description,
    lecture:{}
}
if(req.file){


    try{
        const result = await cloudinary.v2.uploader.upload(req.file.path ,{

            folder: 'lms',
            chunk_size: 60000000, // 60 mb size
            resource_type: 'video',
        })
        
        if(result){
        lectureData.lecture.public_id = result.public_id
        lectureData.lecture.secure_url = result.secure_url
        
        }
        
        fs.rm(`uploads/${req.file.filename}`)
        
        
    }catch(e){

return next(
    new AppError(e.message ,500)
)

    }

}


course.lectures.push(lectureData)

course.numberOfLectures = course.lectures.length

await course.save()

res.status(200).json({
    success: true,
    message:"Lecture successfully added to the course",
    course
})



}

catch(e){


    
return next(
    new AppError(e.message ,500))
}





}



const removeLectureFromCourse = async(req,res,next) =>{
    

const {courseId,lectureId} = req.query 
// console.log("remove",courseId,lectureId)


if(!courseId){
return next (new AppError('course id is required',400))

}
if(!lectureId){
    return next (new AppError('lecture id is required',400))
}

const course  = await Course.findById(courseId)
if(!course){
return next(new AppError('course with given id does not exist',400))
}


const lectureIndex = course.lectures.findIndex((lecture) =>lecture._id.toString() === lectureId.toString())


if(lectureIndex === -1){
    return next(new AppError('lecture with given id does not exist',400))

}

await cloudinary.v2.uploader.destroy(
    course.lectures[lectureIndex].lecture.public_id,
    {
      resource_type: 'video',
    }
  );


  // Remove the lecture from the array
  course.lectures.splice(lectureIndex, 1);

  // update the number of lectures based on lectres array length
  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  // Return response
  res.status(200).json({
    success: true,
    message: 'Course lecture removed successfully',
  });





}

export{getAllCourses,
    getLecturesByCourseId

,createCourse
,updateCourse
,removeCourse,
addLectureToCourseById
,removeLectureFromCourse
}