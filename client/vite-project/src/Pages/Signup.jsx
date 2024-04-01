import React, { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { BsPersonCircle } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {toast} from 'react-hot-toast'
import { createAccount } from '../Redux/Slices/AuthSlice'
import { isEmail, ispassword } from '../Helpers/regexMatcher'
function Signup() {
    const disptch = useDispatch()
    const navigate = useNavigate()
    

const [previewImage , setPreviewImage] = useState("")

const [signupdata , setsignupdata] = useState({

fullName: "",
email:"",
password:"",
avatar:""



})


function handleinput(e){

    const{ name , value} = e.target
    setsignupdata({
        ...signupdata,
        [name]: value
    })
}



function getImage(event){
event.preventDefault()
//getting
const uploadImage = event.target.files[0]
if(uploadImage){

    setsignupdata({
        ...signupdata,
        avatar:uploadImage
    })
    const fileReader = new FileReader()
    fileReader.readAsDataURL(uploadImage)
    fileReader.addEventListener('load' ,function(){
        //console.log(this.result)
        setPreviewImage(this.result)
    })
}



}



 async function createNewAccount(event){

    event.preventDefault()

if(!signupdata.email || !signupdata.fullName || !signupdata.password || !signupdata.avatar){
    toast.error("Please fill all the details")
    return
}

// checking name  field length
if(signupdata.fullName.length<5){
  toast.error("Name should be atleast of 5 charcters") 
  return 
}


if(!isEmail(signupdata.email)){
//email regex use in match
toast.error("Invalid email id")
return

}

// password validation

if(!ispassword(signupdata.password)){
toast.error("Password should be 6 - 16 character long")
return

}


const formData = new FormData()

formData.append("fullName" ,signupdata.fullName)
formData.append("email" ,signupdata.email)
formData.append("password" ,signupdata.password)
formData.append("avatar", signupdata.avatar)
console.log("formdatadign",formData)

//dispatch create account action
const response = await disptch(createAccount(formData))
console.log(response)
if(response?.payload?.success){
    navigate('/')}

setsignupdata({

    fullName: "",
    email:"",
    password:"",
    avatar:""


})

setPreviewImage("")

}



  return (
    <HomeLayout>
      
<div className='flex items-center justify-center h-[90vh]'
>


<form noValidate onSubmit={createNewAccount}className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>


<h1 className='text-center text-2xl font-bold'>Registeration Page</h1>

<label htmlFor="image_uploads" className='cursor-pointer'>
{
previewImage ? (
    <img className='w-24 h-24 rounded-full m-auto' src={previewImage}/>
):(<BsPersonCircle className='w-24 h-24 rounded-full m-auto'/>)

}

</label>
<input 
onChange={getImage}
type="file" 
className='hidden'
 id='image_uploads' 
 name='image_uploads'
    accept='.jpg, .jpeg,.png , .svg'

 />


<div className='flex flex-col gap-1'>
<label htmlFor="fullName" className='font-semibold'>FullName</label>
<input type="text"
required
name='fullName'
id='fullName'
placeholder='Enter your FullName'
className='bg-transparent px-2 py-1 border'
onChange={handleinput}
value={signupdata.fullName}
 />
 </div>

<div className='flex flex-col gap-1'>

<label htmlFor="email" className='font-semibold'>Email</label>
<input type="email"
required
name='email'
id='email'
placeholder='Enter your Email'
className='bg-transparent px-2 py-1 border'
onChange={handleinput}
value={signupdata.email}
 />

</div>

<div className='flex flex-col gap-1'>
<label htmlFor="password" className='font-semibold'>Password</label>
<input type="password"
required
name='password'
id='password'
placeholder='Enter your Password'
className='bg-transparent px-2 py-1 border'
onChange={handleinput}
value={signupdata.password}
 />
 </div>
 
<button type='submit' className='w-full  mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded py-2 font-semibold text-lg'>Create Account</button>


<p className='text-center'>
    Already have an account ? <Link to='/login' className='link text-accent cursor-pointer'>Login</Link>
</p>

</form>



</div>



    </HomeLayout>
  )
}

export default Signup
