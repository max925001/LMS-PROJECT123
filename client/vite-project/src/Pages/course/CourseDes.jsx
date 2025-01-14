import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";

function CourseDes() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!state) navigate("/courses");
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-16 px-4 sm:px-10 lg:px-20 flex flex-col items-center justify-center bg-gray-900 text-gray-100">
        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10 items-center">
          {/* Course Image */}
          <div className="w-full h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
            <img
              src={state?.thumbnail?.secure_url}
              alt="Course Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Course Details */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-lg sm:text-xl space-y-4 sm:space-y-0">
              <p className="font-semibold">
                <span className="text-yellow-500">Total Lectures:</span>{" "}
                {state?.numberOfLectures || "N/A"}
              </p>
              <p className="font-semibold">
                <span className="text-yellow-500">Instructor:</span>{" "}
                {state?.createdBy || "N/A"}
              </p>
            </div>

            {/* Action Button */}
            {role === "ADMIN" || role === "USER" ? (
              <button
                onClick={() =>
                  navigate("/course/displaylectures", { state: { ...state } })
                }
                className="bg-yellow-500 text-xl rounded-md font-bold px-5 py-2 w-full sm:w-auto hover:bg-yellow-600 transition-all duration-300"
              >
                Watch Lectures
              </button>
            ) : (
              <button className="bg-yellow-500 text-xl rounded-md font-bold px-5 py-2 w-full sm:w-auto hover:bg-yellow-600 transition-all duration-300">
                Subscribe
              </button>
            )}
          </div>
        </div>

        {/* Course Description */}
        <div className="w-full max-w-4xl space-y-4 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-yellow-500 mb-5">
            {state?.title || "Course Title"}
          </h1>
          <p className="text-xl text-yellow-500">Course Description:</p>
          <p className="text-lg text-gray-300">
            {state?.description || "No description available for this course."}
          </p>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDes;
