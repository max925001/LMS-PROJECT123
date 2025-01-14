import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";

function DisplayLecture() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseid, lectureid) {
    await dispatch(deleteCourseLecture({ courseid, lectureid }));
    await dispatch(getCourseLectures(courseid));
  }

  useEffect(() => {
    const id = state?.state?._id;
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(id));
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col items-center justify-center min-h-[90vh] py-10 px-4 bg-gray-900 text-gray-200">
        {/* Course Name */}
        <div className="text-center text-2xl font-semibold text-yellow-500 mb-6">
          Course Name: {state?.state?.title}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
          {/* Left Section - Video and Details */}
          <div className="flex flex-col w-full lg:w-1/2 bg-gray-800 rounded-lg shadow-lg">
            <video
              src={lectures && lectures[currentVideo]?.lecture?.secure_url}
              className="w-full h-60 lg:h-80 object-cover rounded-t-lg"
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            ></video>
            <div className="p-4">
              <h1 className="text-xl font-semibold text-yellow-500 mb-2">
                Title: {lectures && lectures[currentVideo]?.title}
              </h1>
              <p className="text-gray-300">
                <span className="text-yellow-500">Description:</span>{" "}
                {lectures && lectures[currentVideo]?.description}
              </p>
            </div>
          </div>

          {/* Right Section - Lecture List */}
          <ul className="flex flex-col w-full lg:w-1/2 bg-gray-800 rounded-lg shadow-lg p-4 space-y-4">
            <li className="flex justify-between items-center font-semibold text-xl text-yellow-500 mb-2">
              <p>Lectures List</p>
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/addLecture", {
                      state: { ...state?.state },
                    })
                  }
                  className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-md font-medium hover:bg-yellow-600 transition"
                >
                  Add New Lecture
                </button>
              )}
            </li>

            {lectures &&
              lectures.map((lecture, index) => (
                <li key={lecture.id} className="flex flex-col space-y-2">
                  <p
                    className="cursor-pointer text-gray-300 hover:text-yellow-500"
                    onClick={() => setCurrentVideo(index)}
                  >
                    <span className="font-semibold">
                      Lecture {index + 1}:
                    </span>{" "}
                    {lecture?.title}
                  </p>
                  {role === "ADMIN" && (
                    <button
                      onClick={() =>
                        onLectureDelete(state?.state?._id, lecture?._id)
                      }
                      className="px-3 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition"
                    >
                      Delete Lecture
                    </button>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </HomeLayout>
  );
}

export default DisplayLecture;
