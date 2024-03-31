import React, { useState } from 'react'
import {FiMenu} from 'react-icons/fi'
import {useDispatch, useSelector} from 'react-redux'
import {AiFillCloseCircle} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import { logout } from '../Redux/Slices/AuthSlice'
function HomeLayout({children}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()




  const isLoggedIn = useSelector((state) =>state?. auth?. isLoggedIn)

const role = useSelector((state) => state?. auth?. role)
    function hideDrawer(){
         const element = document.getElementsByClassName("drawer-toggle")
       element[0].checked = false
       changewidth()
    
      
    }
function changewidth(){
const drawerside = document.getElementsByClassName('drawer-side')
drawerside[0].style.width ="auto"


}


 async function handleLogout(e){
e.preventDefault()

const res =await dispatch(logout())

if(res?. payload?. success)
navigate("/")
}


  return (
    
     <div className='min-h-[90vh] '>

<div className="drawer absolute left-0 z-50 w-fit">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button"><FiMenu 
        size={"32px"}
        onClick={changewidth}
        className='font-bold text-white m-4'
    /></label>
  </div> 
  <div className="drawer-side w-0">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 bg-base-200 text-base-content ">
      {/* Sidebar content here */} 
      <li className='w-fit absolute right-2 z-50'>
        <button onClick={hideDrawer}>
          <AiFillCloseCircle size={24}/>
        </button>
      </li>
      <li><Link to={"/"}>Home</Link></li>
      {
isLoggedIn && role == 'ADMIN' && (
  <li>
    <Link to="/admin/dashboard">Admin DashBoard</Link>
  </li>
)

      }
      {
isLoggedIn && role == 'ADMIN' && (
  <li>
    <Link to="/course/create">Create Courses</Link>
  </li>
)

      }
      <li><Link to={"/courses"}>All Course</Link></li>
      <li><Link to={"/contact"}>Contact</Link></li>
      <li><Link to={"/about"}>About Us</Link></li>
      
      
     
      {
        !isLoggedIn && (

          <li >
          <div className='w-full flex items-center justify-center'>
            <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full text-red-400 bg-white'> 
            <Link to="/login">Login</Link>
            </button>
            <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full text-red-400  bg-white'> 
            <Link to="/signup">Signup</Link>
            </button>
          </div>
          </li>
        )
      }
      {
        isLoggedIn && (

          <li >
          <div className='w-full flex items-center justify-center'>
            <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full text-red-400 bg-white'> 
            <Link to="/user/profile">Profile</Link>
            </button>
            <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full text-red-400  bg-white'> 
            <Link onClick={handleLogout}>Logout</Link>
            </button>
          </div>
          </li>
        )
      }
    </ul>
  </div>
</div>

{children}

<Footer/>
     </div>
 
  )
}

export default HomeLayout
