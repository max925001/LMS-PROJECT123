import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeLayout from '../../Layouts/HomeLayout'
import { useSelector } from 'react-redux'

function CourseDes() {
const navigate = useNavigate()
    const {state} = useLocation() // ye help karga jo state pass kiya hai navigate me usko access karne me
 
    const {role ,data} = useSelector((state) => state.auth

    )
    useEffect(() =>{

    },[])
  return (
    <HomeLayout>
    <div className='min-h-[90vh] pt-20 px-20 flex flex-col items-center jsutify-center text-white'>

        <div className='grid grid-cols-2 gap-10 py-10 relative'>
            <img src={state?. thumbnail ?. secure_url } alt=""
            className='w-full h-64' />
<div className='space-y-4'>

<div className='flex  flex-col items-center justify-between text-xl'>

   <p className='font-semibold'>
    <span className='text-yellow-500'>
      Total Lecture :   
    </span>
    {state?. numberOfLectures}
   </p> 
   <p className='font-semibold'>
    <span className='text-yellow-500'>
      Instructor :   
    </span>
    {state?. createdBy}
   </p> 
</div>
{
    role =="ADMIN" || role=="USER"  /*data?.subscription?.status == "inactive"*/ ? (
        <button onClick={() =>navigate("/course/displaylectures" ,{state: {...state}})} className='bg-yellow-600 text-xl rounded-md font-bold px-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300 '>Watch Lectures</button>
    ):(
        <button className='bg-yellow-600 text-xl rounded-md font-bold px-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300 '>
            Subscribe
        </button>
    )
}


</div>

      <div className='space-y-2 text-xl'>
        <h1 className='text-3xl font-bold text-yellow-500 mb-5 text-center'>
            {state?. title}
        </h1>
        <p className='text-yellow-500'>Course description:</p>
        <p>{state?. description}</p>
      </div>     
        </div>
    </div>
      
    </HomeLayout>
  )
}

export default CourseDes
