
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../Helpers/axiosinstance'
const initialState = {
    lectures: []
}





export const  getCourseLectures = createAsyncThunk("/course/lecture/get" ,async(id) =>{


try{

const response =  axiosInstance.get(`/course/${id}`)
console.log("lecture response" ,response)
toast.promise(response ,{
    loading:"fetching course lectures",
    success:"lecture fetched successfully",
    error:"failed to load the lecture"
})

return (await response).data


}catch(error){


toast.error(error?.response?.data?.message)

}




})





export const  addCourseLecture = createAsyncThunk("/course/lecture/add" ,async(data) =>{


    try{
    
const formData = new FormData()
formData.append("lecture" ,data.lecture)
formData.append("title" ,data.title)
formData.append("description" ,data.description)

    const response = axiosInstance.post(`/course/${data.id}` ,formData)
    
    toast.promise(response ,{
        loading:"add course lectures",
        success:"lecture add successfully",
        error:"failed to add the lecture"
    })
    
return (await response).data

    }catch(error){
    
    
    toast.error(error?.response?.data?.message)
    
    }
    
    
    
    
    })




    export const  deleteCourseLecture = createAsyncThunk("/course/lecture/delete" ,async(data) =>{


        try{
        
    
    
        const response = axiosInstance.delete(`/course/${data.id}` ,formData)
        
        toast.promise(response ,{
            loading:"add course lectures",
            success:"lecture add successfully",
            error:"failed to add the lecture"
        })
        
    return (await response).data
    
        }catch(error){
        
        
        toast.error(error?.response?.data?.message)
        
        }
        
        
        
        
        })


const lectureSlice = createSlice({

name:"lecture",
initialState,
reducers:{},
extraReducers: (builder) =>{
builder.addCase(getCourseLectures.fulfilled,(state, action) =>{
    console.log(action)
    state.lectures = action?.payload?.lectures
})
.addCase(addCourseLecture.fulfilled,(state ,action) =>{
    console.log(action)
    state.lectures = action?.payload?.course?.lectures
})


}


})


export default lectureSlice.reducer