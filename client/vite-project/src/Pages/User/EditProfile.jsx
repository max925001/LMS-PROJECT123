import React, { useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { getUserData, updateProfile } from '../../Redux/Slices/AuthSlice'
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
function EditProfile() {

const dispatch = useDispatch()
const navigate = useNavigate()
const [data ,setData] = useState({
    previewImage:"",
    fullName:"",
    avatar:undefined,
    userId:useSelector((state) => state?.auth?.data?._id)
})



function handleImageUpload(e){
e.preventDefault()
const uploadedImage = e.target.files[0]
if(uploadedImage){
    const fileReader = new FileReader()
    fileReader.readAsDataURL(uploadedImage)
    fileReader.addEventListener("load" ,function(){

        setData({
            ...data ,
            previewImage:this.result,
            avatar:uploadedImage
        })
    })
}


}


function handleInputChange(e){

    const {name , value} =e.target

    setData({

        ...data,
        [name]:value
    })
}

 async function onFormSubmit(e){
e.preventDefault()
console.log("da",data)
if(!data.fullName ||  !data.avatar){

    toast.error('All fields are mandatory')
    return
}
if(data.fullName.length<5){
    toast.error("Name cannot be of less than 5 Charcters")
    return
}


const formData = new FormData()
formData.append("fullName" , data.fullName)
formData.append("avatar" ,data.avatar)

console.log(formData.entries().next())
await dispatch(updateProfile([data.userId,formData]))

await dispatch(getUserData())
navigate('user/profile')
}

  return (
    <HomeLayout>
      
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Edit Profile Page</h1>

          {/* input for image file */}
          <label className="cursor-pointer" htmlFor="image_uploads">
            {data.previewImage ? (
              <img
                className="w-28 h-28 rounded-full m-auto"
                src={data.previewImage}
                alt="preview image"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={handleImageUpload}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png"
          />

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="fullName">
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your full name"
              className="bg-transparent px-2 py-1 border"
              value={data.fullName}
              onChange={handleInputChange}
            />
          </div>

          <Link to={"/user/profile"}>
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
              <AiOutlineArrowLeft /> Back to Profile
            </p>
          </Link>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Update Profile
          </button>
        </form>
      </div>
      
    </HomeLayout>
  )
}

export default EditProfile
