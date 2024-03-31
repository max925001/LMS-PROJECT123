import React, { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {toast} from 'react-hot-toast'
import { login } from '../Redux/Slices/AuthSlice'
function Login() {
    const disptch = useDispatch()
    const navigate = useNavigate()
    



const [logindata , setLogindata] = useState({


email:"",
password:"",




})


function handleinput(e){

    const{ name , value} = e.target
    setLogindata({
        ...logindata,
        [name]: value
    })
}



 async function OnLoginAccount(event){

    event.preventDefault()

if(!logindata.email  || !logindata.password){
    toast.error("Please fill all the details")
    return
}







//dispatch create account action
const response = await disptch(login(logindata))
//console.log(response)
if(response?.payload?.success){
    navigate('/')}

setLogindata({

  
    email:"",
    password:"",
   


})



}



  return (
    <HomeLayout>
      
<div className='flex items-center justify-center h-[90vh]'
>


<form noValidate onSubmit={OnLoginAccount}className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>


<h1 className='text-center text-2xl font-bold'>Login Page</h1>







<div className='flex flex-col gap-1'>

<label htmlFor="email" className='font-semibold'>Email</label>
<input type="email"
required
name='email'
id='email'
placeholder='Enter your Email'
className='bg-transparent px-2 py-1 border'
onChange={handleinput}
value={logindata.email}
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
value={logindata.password}
 />
 </div>
 
<button type='submit' className='w-full  mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded py-2 font-semibold text-lg'>Login </button>


<p className='text-center'>
    Do not have account ? <Link to='/signup' className='link text-accent cursor-pointer'>Signup</Link>
</p>

</form>



</div>



    </HomeLayout>
  )
}

export default Login
