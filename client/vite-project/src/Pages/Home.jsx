import React from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { Link } from 'react-router-dom'
import onlineImage from '../assets/Images/OnlineImage.avif'
function Home() {
  return (
    <HomeLayout>
      <div className='flex flex-col   pt-10 text-white lg:flex lg:flex-row items-center justify-center gap-10 mx-16 h-[90vh]'>

<div className=' w-full  md:space-y-6 lg:w-1/2 lg:space-y-6'>
    <h1 className=' text-3xl  lg:text-5xl font-semibold'>

      Find out best     
      <span className='text-yellow-500 font-bold'>Online Course</span>
    </h1>
    <p className='text-xl text-gray-200'>
    We have a large library of course taught by highly skilled and qualified faculties at a very affordable cost

    </p>
    <div className=' flex  flex-col items-center justify-center mt-5 lg:flex-row lg:space-x-6'>
<Link to="/courses">
  <button className='bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'> 
    Explore courses
  </button>
</Link>
<Link to="/contact">
  <button className=' border border-yellow-500 m-6 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'> 
  Contact Us
  </button>
</Link>
    </div>
</div>


<div className='w-1/2 flex items-center justify-center'>
<img src={onlineImage} alt="homepage image" className='  w-full' />
</div>
      </div>

    </HomeLayout>
  )
}

export default Home
