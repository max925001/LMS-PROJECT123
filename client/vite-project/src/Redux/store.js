import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice'
import courseSliceReducer from "./Slices/courseSlice";
import lecturesSliceReducer  from "./Slices/LectureSlice";
const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        lecture:lecturesSliceReducer

    },
    devTools: true
})

export default store