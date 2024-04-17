import React, { useEffect, useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { addCourseLecture } from '../../Redux/Slices/LectureSlice'
import { AiOutlineArrowLeft } from 'react-icons/ai'

function AddLecture() {

const courseDetails =useLocation().state
const dispatch = useDispatch()
const navigate = useNavigate()

const [userInput ,setUserInput] = useState({
id:courseDetails._id,
title:"",
description:"",
lecture: undefined,
videoSrc:""



})


function handleInputChange(e){
const {name,value} = e.target

setUserInput({...userInput,[name]:value})


}

function handleVedio(e){

const vedio = e.target.files[0]
const source = window.URL.createObjectURL(vedio)
console.log(source)
setUserInput({...userInput,lecture:vedio,videoSrc:source})



}

 async function onFormSubmit(e){
e.preventDefault()
if(!userInput.lecture || !userInput.title || !userInput.description){
toast.error("all fields are required")
return
}


const response = await dispatch(addCourseLecture(userInput))
navigate(-1)
if(response?.payload?.success){
    setUserInput({
id:courseDetails._id,
title:"",
description:"",
lecture: undefined,
videoSrc:""

    })
}

 }
console

 useEffect(() =>{


    if(!courseDetails) navigate("/courses")
 },[])
  return (
    <HomeLayout>
      

      <div className='min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16'>

<div className='flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-ld'>
    <header className='flex items-center justify-center relative'>
    <button className='left-2 text-xl text-green-500 '
    onClick={() => navigate(-1)}
    >
       <AiOutlineArrowLeft/> 
    </button>
        <h1 className='text-xl text-yellow-500 font-semibold'>Add new lecture</h1>
    </header>

<form action="" onSubmit={onFormSubmit} className='flex flex-col gap-3'>


<input type="text" name='title'

placeholder='Enter the title of lecture'
onChange={handleInputChange}
className='bg-transparent-px-3 px-5 py-4 border'
value={userInput.title}
 />


<textarea 

type="text" name='description'
placeholder='Enter the description of lecture'
onChange={handleInputChange}
value={userInput.description}
className='bg-transparent-px-3 px-3 py-1 border resize-none overflow-y-scroll h-24 '
 id="" ></textarea>


{userInput.videoSrc? (
    <video
    
    muted
    src={userInput.videoSrc}
    controls
    controlsList='nodownload nofullscreen'
    disablePictureInPicture 
    className='object-fill rounded-tl-lg rounded-tr-lg w-full'
    >

    </video>
):(


    <div className='h-48 border flex items-center justify-center cursor-pointer'>
       <label className='font-semibold text-cl cursor-pointer' htmlFor="lecture">Choose your video</label> 
       <input type="file" className='hidden' id='lecture'
       
       name='lecture'
       onChange={handleVedio}
       accept='vedio/mp4 vedio/x-mp4 vedio/*'
       //vedio/* karne se aur jo bhi type ki vedio hogi vo bhi aa jayegi

       
       
       
        />
    </div>
) }

<button type='submit' className='btn-primary px-2 py-1 rounded-md font-semibold text-sm text-white bg-blue-500'>

Add new Lecture

</button>


</form>


</div>

      </div>
    </HomeLayout>
  )
}

export default AddLecture
