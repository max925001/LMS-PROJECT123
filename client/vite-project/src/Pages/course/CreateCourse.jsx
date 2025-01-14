import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/courseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  function handleImageload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast.error("All fields are required");
      return;
    }
    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col gap-5 p-6 bg-gray-800 shadow-lg rounded-lg max-w-[500px] w-full sm:p-8"
        >
          {/* Back Link */}
          <Link
            className="absolute top-4 left-4 text-2xl text-gray-400 hover:text-gray-200 transition-all"
            to="/courses"
          >
            <AiOutlineArrowLeft />
          </Link>

          {/* Heading */}
          <h1 className="text-center text-2xl font-bold text-gray-100">
            Create New Course
          </h1>

          {/* Upload Thumbnail */}
          <div>
            <label
              htmlFor="image_upload"
              className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-600 p-4 rounded-md hover:bg-gray-700"
            >
              {userInput.previewImage ? (
                <img
                  className="w-full h-44 object-cover rounded-md"
                  src={userInput.previewImage}
                  alt="Thumbnail Preview"
                />
              ) : (
                <span className="text-gray-400">
                  Upload your course thumbnail
                </span>
              )}
            </label>
            <input
              type="file"
              id="image_upload"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={handleImageload}
            />
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="text-gray-300 font-medium mb-1"
              >
                Course Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter your title"
                className="border border-gray-600 px-3 py-2 rounded-md bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={userInput.title}
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="createdBy"
                className="text-gray-300 font-medium mb-1"
              >
                Course Instructor
              </label>
              <input
                type="text"
                id="createdBy"
                name="createdBy"
                placeholder="Enter instructor name"
                className="border border-gray-600 px-3 py-2 rounded-md bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={userInput.createdBy}
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="text-gray-300 font-medium mb-1"
              >
                Course Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="Enter course category"
                className="border border-gray-600 px-3 py-2 rounded-md bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={userInput.category}
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-gray-300 font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter course description"
                className="border border-gray-600 px-3 py-2 rounded-md bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 h-24 resize-none"
                value={userInput.description}
                onChange={handleUserInput}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-600 transition-all"
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
