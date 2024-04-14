

import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './Pages/Home'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import CourseList from './Pages/course/CourseList'
import Contact from './Pages/Contact'
import Dienied from './Pages/Dienied'
import CourseDes from './Pages/course/CourseDes'
import RequiredAuth from './Components/Auth/RequiredAuth'
import CreateCourse from './Pages/course/CreateCourse'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import DisplayLecture from './Pages/Dashboard/DisplayLecture'
import AddLecture from './Pages/Dashboard/AddLecture'

function App() {
  

  return (
    <>
   

      <Routes>


<Route  path='/' element={<Home/>}/>
<Route  path='/about' element={<AboutUs/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route  path='/login' element={<Login/>}/>

<Route path='/courses' element={<CourseList/>}/>
<Route path='/contact' element={<Contact/>}/>
<Route path='/course/description' element={<CourseDes/>}/>
<Route  element={<RequiredAuth allowedRoles={["ADMIN"]}/>}>

<Route path='/course/create' element={<CreateCourse/>}/>
<Route path='/course/addLecture' element={<AddLecture/>}/>

</Route>
<Route element={<RequiredAuth allowedRoles={["ADMIN" ,"USER"]}/>}>
<Route path='/user/profile' element={<Profile/>}/>
<Route path='/user/editprofile' element={<EditProfile/>}/>

<Route path='/course/displaylectures' element={<DisplayLecture/>}/>

</Route>
<Route path='/denied' element={<Dienied/>}/>

<Route path='*' element={<NotFound/>}/>

     </Routes>
  
    </>
  )
}

export default App
