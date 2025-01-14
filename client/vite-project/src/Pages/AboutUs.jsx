import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import aboutus from "../assets/Images/Aboutus.jpg";
import cloud1 from "../assets/Images/cloud-computing.jpg";
import web_d from "../assets/Images/web_d.jpg";
import python2 from "../assets/Images/python2.jpg";
import dsa from "../assets/Images/dsa.jpg";
import hacker from "../assets/Images/hacker2.jpg";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="flex flex-col items-center pt-10 text-white bg-gray-900">
        {/* About Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10 px-5 lg:px-20">
          <section className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl lg:text-5xl font-bold text-yellow-500">
              Affordable and Quality Education
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
              Our goal is to provide affordable and quality education to the
              world. We are building a platform for aspiring teachers and
              students to share their skills, creativity, and knowledge with
              each other, empowering growth and contributing to the wellness of
              mankind.
            </p>
          </section>
          <div className="w-full lg:w-1/2">
            <img
              className="w-full rounded-xl shadow-lg"
              src={aboutus}
              alt="About us"
            />
          </div>
        </div>

        {/* Carousel Section */}
        <div className="w-full lg:w-2/3 my-16">
          <div className="carousel rounded-xl overflow-hidden shadow-xl">
            <div id="slide1" className="carousel-item relative w-full">
              <img src={cloud1} className="w-full" alt="Cloud Computing" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide5" className="btn btn-circle bg-yellow-500 text-black hover:bg-yellow-600">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle bg-yellow-500 text-black hover:bg-yellow-600">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <img src={web_d} className="w-full" alt="Web Development" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle bg-yellow-500 text-black hover:bg-yellow-600">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle bg-yellow-500 text-black hover:bg-yellow-600">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img src={python2} className="w-full" alt="Python Programming" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle bg-yellow-500 text-black hover:bg-yellow-600">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle bg-yellow-500 text-black hover:bg-yellow-600">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <img src={hacker} className="w-full" alt="Ethical Hacking" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle bg-yellow-500 text-black hover:bg-yellow-600">
                  ❮
                </a>
                <a href="#slide5" className="btn btn-circle bg-yellow-500 text-black hover:bg-yellow-600">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide5" className="carousel-item relative w-full">
              <img src={dsa} className="w-full" alt="Data Structures and Algorithms" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle bg-yellow-500 text-black hover:bg-yellow-600">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle bg-yellow-500 text-black hover:bg-yellow-600">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
