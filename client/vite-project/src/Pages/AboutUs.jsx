import React from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import aboutus from '../assets/Images/Aboutus.jpg'
import cloud1 from '../assets/Images/cloud-computing.jpg'
import web_d from '../assets/Images/web_d.jpg'
import python2 from '../assets/Images/python2.jpg'
import dsa from '../assets/Images/dsa.jpg'
import hacker from '../assets/Images/hacker2.jpg'
function AboutUs() {
  return (
    <HomeLayout>
      

<div className='pl-20 pt-20 flex flex-col text-white'>

<div className='flex items-center gap-5 mx-10'>


<section className='w-1/2 space-y-10'>
<h1 className='text-5xl text-yellow-500 font-semibild'>
    Affordable and quality education
</h1>
<p className='text-xl text-gray-200'>
    Our goal is to provide the affordable and quality education to the world. 
    We are providing the platform for the aspiring teachers and student to share 
    their skills, creativity and knowledge to each other
    to empower and contribute in the growth and wellness of mankind
</p>
</section>

<div className='w-1/2'>

    <img className='drop-shadow-2xl'
    id='test1'
    style={{
        filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"
    }}
    src={aboutus} alt="about_main_image" />
</div>



</div>


<div className="carousel w-1/2  my-16 m-auto">
  <div id="slide1" className="carousel-item relative w-full ">
    <img src={cloud1} className="w-full rounded-xl" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide5" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src={web_d} className="w-full rounded-xl" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src={python2} className="w-full rounded-xl" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative  w-full">
    <img src={hacker} className="w-full rounded-xl" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide5" className="btn btn-circle">❯</a>
    </div>
  </div>


  <div id="slide5" className="carousel-item relative  w-full">
    <img src={dsa} className="w-full rounded-xl" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>

</div>


</div>

    </HomeLayout>
  )
}

export default AboutUs
