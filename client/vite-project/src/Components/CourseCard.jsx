import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletecourse, getAllCourse } from '../Redux/Slices/courseSlice'

function CourseCard({data}) {
  const dispatch = useDispatch()
 const {role} = useSelector((state) => state.auth)
 const {courseData} = useSelector((state) => state.course)
    const navigate = useNavigate()
async function deleteCourse(id){

await dispatch(deletecourse(id))
await dispatch(getAllCourse())
}


// useEffect(() =>{
//    dispatch(getAllCourse())
  
//       },[])

  return (
    <div 
   
    className='text-white w-[22rem] h-[438px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700 '>
      <div className='overflow-hidden   '    onClick={() =>navigate('/course/description/', {state:{...data}})}>
<img src={data?.thumbnail?.secure_url} alt="course thumbnail" className='h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-ou duration-300t' />

<div className='p-3 space-y-1 text-white'>

<h2 className='text-xl font-bold text-yellow-500 line-clamp-2'>
    {data?.title}
</h2>
<p className='line-clamp-2'>
    {data?.description}
</p>
<p className='font-semibold'>
<span className='text-yellow-500 font-bold'>Category:</span>
    {data?. category}
</p>
<p className='font-semibold'>
<span className='text-yellow-500 font-bold'>Total lectures:</span>
    {data?.numberoflectures}
</p>
<p className='font-semibold'>
<span className='text-yellow-500 font-bold'>Instructor:</span>
    {data?.createdBy}
</p>
</div>
      </div>
{
  role==="ADMIN" &&(<button className='btn-accent px-2 py-1 rounded-md font-semibold text-sm text-white bg-yellow-500' onClick={() =>deleteCourse(data._id)}>Delete Course</button>)
}
    </div>
  )
}

export default CourseCard
