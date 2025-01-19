
import {asyncThunkCreator, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../Helpers/axiosinstance'
const initialState = {

    courseData: []
}



export const getAllCourse = createAsyncThunk("/course/get" ,async () =>{
try{
    
const response = axiosInstance.get("/course")
toast.promise(response,{
    loading: "Loading course data...",
    success:"Course Loaded successfully",
    error:"Failed to get the course"
})
// ye return wali line humhe ye bta rhi hai jo backend me response diya hai vo la rha hai
//data karne se sara data aayega
return (await response).data.courses

}catch(error){
toast.error(error?. response?. data?.message)
    
}


})




export const createNewCourse = createAsyncThunk("/course/create" ,async (data) =>{


    try{
        let formData = new FormData()

        formData.append("title" ,data?.title)
        formData.append("description" ,data?.description)
        formData.append("category" ,data?.category)
        formData.append("createdBy" ,data?.createdBy)
        formData.append("thumbnail" ,data?.thumbnail)

const response = axiosInstance.post("/course" ,formData)
toast.promise(response,
    {
        loading:"Creating New Course",
        success:"Course created successfully",
        error:"Failed to created course"
    })
    return (await response).data

    }catch(error){
toast.error(error?. response?.data?.message)
    }
})

export const deletecourse =createAsyncThunk("/course/delete",async(id) =>{

try{
const response = axiosInstance.delete(`/course/${id}`)

toast.promise(response,
    {
        loading:"Course is Deleting Nown Please Wait",
        success:"Course delete successfully",
        error:"Failed to delete course"
    })
    return (await response).data




}catch(error){

    toast.error(error?. response?.data?.message)

}







})

const courseSlice = createSlice({
name:"courses",
initialState,
reducers:{},
extraReducers: (builder) =>{

    builder.addCase(getAllCourse.fulfilled,(state ,action) =>{

        if(action.payload){
            console.log(action.payload)
            state.courseData = [...action.payload]
        }
    })
}

})


export default courseSlice.reducer
