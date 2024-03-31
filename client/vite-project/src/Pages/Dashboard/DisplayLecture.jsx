import React, { useEffect } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseLectures } from '../../Redux/Slices/LectureSlice'

function DisplayLecture() {

const navigate = useNavigate()
const dispatch = useDispatch()
const state = useLocation()
const {Lectures} = useSelector((state) =>state.lecture)
const {role} = useSelector((state) =>state.auth)
    useEffect(() =>{
console.log(state)
if(!state) navigate("/courses")
dispatch(getCourseLectures(state._id))
    } ,[])
  return (
    <HomeLayout>

course name: {state?.title}

    </HomeLayout>
  )
}

export default DisplayLecture
