import React, { useEffect ,useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourseLecture, getCourseLectures } from '../../Redux/Slices/LectureSlice'

function DisplayLecture() {

const navigate = useNavigate()
const dispatch = useDispatch()
const state = useLocation()
const {lectures} = useSelector((state) => state.lecture)
console.log("L",lectures)
const {role} = useSelector((state) =>state.auth)


const [currentVideo , setCurrentVideo] = useState(0)


 async function onLectureDelete(courseid,lectureid){
console.log("delete",courseid,lectureid)
await dispatch(deleteCourseLecture({courseid:courseid,lectureid:lectureid}))
await dispatch(getCourseLectures(courseid))

}


    useEffect(() =>{
console.log("lecture state",state)
const id = state?.state?._id
console.log("id",id)
if(!state) navigate("/courses")
dispatch(getCourseLectures(id))
    } ,[])
  return (
    <HomeLayout>

<div className='flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text '>

<div className='text-center text-2xl font-semibold text-yellow-500'>
  Course Name: {state?.state?.title}
</div>

<div className='flex justify-center gap-10 w-full '>

{/* {left section for playing videos and displaying course details to admin} */}
<div className ='space-y-5 w-[23rem] p-2 rounded-lg shadow-[0_0_10px_black]'>

<video src={lectures&& lectures[currentVideo]?.lecture?.secure_url}

 className='object-fill rounded-tl-lg rounded-tr-lg w-full
 
 '
 
 controls
 disablePictureInPicture
 muted
 controlsList='nodownload'
 
 >

 </video>
 <div>
  <h1>
    <span className='text-yellow-500'>Title:
     
    </span>
    {lectures && lectures[currentVideo]?.title}
  </h1>

<p>
  <span className='text-yellow-500 '>Description:</span>
  {lectures && lectures[currentVideo]?.description}
</p>

 </div>
</div>



{/* {right section for displaying video list} */}

<ul className='w-[30rem] p-2 rounded-lg shadow-[0_0_10px_black]'>
<li className='font-semibold text-xl text-yellow-500 flex justify-between'>
  <p>Lectures List</p>
  {role==='ADMIN' &&(
    <button  onClick={() =>navigate("/course/addLecture" ,{state:{...state?.state}})} className='btn-primary px-2 py-1 rounded-md font-semibold text-sm text-white bg-yellow-500'>Add new lectures</button>
  )}
</li>

{
  lectures && lectures.map((lecture ,index) =>{

return (
  <li  className='space-y-3' key={lecture.id}>
  <p className='cursor-pointer' onClick={() => setCurrentVideo(index)}>

    <span>
      {" " } Lecture {index+1}: {""}

    </span>
    {lecture?.title}
  </p>
  {role==='ADMIN' &&(
    <button onClick={() =>onLectureDelete(state?.state?._id ,lecture?._id)}className='btn-accent px-2 py-1 rounded-md font-semibold text-sm text-white bg-yellow-500'>Delete Lectures</button>
  )}
  </li>
)
  }
    
  )
}
</ul>

</div>



</div>

    </HomeLayout>
  )
}

export default DisplayLecture
