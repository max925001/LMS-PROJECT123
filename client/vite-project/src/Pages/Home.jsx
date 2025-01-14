import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import onlineImage from "../assets/Images/OnlineImage.avif";

function Home() {
  return (
    <HomeLayout>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-[90vh] px-5 sm:px-10 lg:px-20 pt-10 text-white bg-gray-900">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug">
            Find the Best{" "}
            <span className="text-yellow-500">Online Courses</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            Discover a wide range of courses taught by highly skilled and
            qualified instructors at an affordable cost.
          </p>
          <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-6 space-y-4 lg:space-y-0">
            <Link to="/courses">
              <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg hover:bg-yellow-600 transition-all ease-in-out duration-300">
                Explore Courses
              </button>
            </Link>
            <Link to="/contact">
              <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg hover:bg-yellow-600 hover:text-white transition-all ease-in-out duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img
            src={onlineImage}
            alt="homepage image"
            className="w-full max-w-sm sm:max-w-md lg:max-w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </HomeLayout>
  );
}

export default Home;
