import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getAllCourse } from '../../Redux/Slices/courseSlice'
import HomeLayout from '../../Layouts/HomeLayout'
import CourseCard from '../../Components/CourseCard'
function CourseList() {

    const dispatch = useDispatch()
    const {courseData} = useSelector((state) => state.course)
// console.log("courseda",courseData)

async function loadCourse(){

await dispatch(getAllCourse())
}

    useEffect(() =>{
loadCourse()

    },[])
  return (
    
    <HomeLayout>

<div className='min-h-[90vh] w-full pt-12 pl-20 flex  flex-col gap-10 text-white'>

    <h1 className='text-center text-3xl font-semibold mb-5'>
        Explore the course made by 
        <span className='font-bold text-yellow-500'>
            Industry Experts
        </span> </h1>
        <div className='mb-10 flex flex-wrap  m-auto gap-14 '>


{

courseData?.map((element) =>{
    return <CourseCard key={element._id} data={element}/>
})
}

        </div>
    
</div>


    </HomeLayout>
  )
}

export default CourseList
