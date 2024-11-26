import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import cam from "../assets/AddPetPage/cam.png";

const AddPet = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset errors on each submit

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData
      );

      // On success, show success toast
      toast.success("Successfully Registered! Welcome to the family!");

      // Save the token in a cookie
      if (response.data.token) {
        Cookies.set("auth_token", response.data.token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      }

      navigate("/"); // Redirect after successful registration
    } catch (error) {
      // Capture validation errors and display them
      if (error.response?.data) {
        // Set errors as the object itself
        const parsedData =
          typeof error.response.data === "string"
            ? JSON.parse(error.response.data)
            : error.response.data;
        console.log(parsedData);
        // Set the parsed data as errors
        setErrors(parsedData.errors || parsedData || {});
      } else {
        const errorMessage =
          error?.response?.data?.error ||
          error?.message ||
          "Registration failed!";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative h-screen w-screen bg-stripes flex items-center justify-center">
      <div className="relative z-10 flex items-center justify-center pt-7 max-[430px]:pt-5 lg:pt-12 max-h-full">
        <div className="relative bg-white w-[500px] lg:w-[600px] max-[430px]:w-[350px] max-[400px]:w-[340px] py-7 lg:py-6 max-[430px]:py-4 rounded-lg shadow-md text-center border-4 max-[430px]:border-0 border-pink-light">
          <div className="flex justify-center items-center">
            <img src={cam} className=" mb-7 max-[430px]:mb-4 2xl:mb-6" />
            <button className="absolute max-[430px]:top-[110px] max-[430px]:right-[70px] max-[640px]:top-[130px] max-[640px]:right-[140px] sm:right-[140px] sm:top-[130px] lg:right-[200px] lg:top-[120px]  w-16 h-16 bg-pink-light rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="size-15"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <form className="w-full h-full" onSubmit={handleSubmit}>
            <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
              <input
                type="text"
                name="pet_name"
                placeholder="Pet Name"
                value={formData.email}
                onChange={handleChange}
                className={`w-4/5 px-3 py-2 border ${
                  errors.email
                    ? "border-red-500"
                    : "border-[rgba(95,91,91,0.3)]"
                } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
              )}
            </div>
            <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-4/5 px-3 py-2 border ${
                  errors.gender
                    ? "border-red-500"
                    : "border-[rgba(95,91,91,0.3)]"
                } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender[0]}</p>
              )}
            </div>
            <div className="grid lg:w-4/5 grid-cols-1 lg:grid-cols-2 m-auto gap-x-4">
              <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
                <input
                  type="text"
                  name="fname"
                  placeholder="Yrs"
                  value={formData.fname}
                  onChange={handleChange}
                  className={`w-4/5 lg:w-full px-3 py-2 border ${
                    errors.fname
                      ? "border-red-500"
                      : "border-[rgba(95,91,91,0.3)]"
                  } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
                />
                {errors.fname && (
                  <p className="text-red-500 text-xs mt-1">{errors.fname[0]}</p>
                )}
              </div>
              <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
                <input
                  type="text"
                  name="lname"
                  placeholder="Month"
                  value={formData.lname}
                  onChange={handleChange}
                  className={`w-4/5 lg:w-full px-3 py-2 border ${
                    errors.lname
                      ? "border-red-500"
                      : "border-[rgba(95,91,91,0.3)]"
                  } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
                />
                {errors.lname && (
                  <p className="text-red-500 text-xs mt-1">{errors.lname[0]}</p>
                )}
              </div>
            </div>
            <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
              <input
                type="password"
                name="password_confirmation"
                placeholder="Weight"
                value={formData.password_confirmation}
                onChange={handleChange}
                className={`w-4/5 px-3 py-2 border ${
                  errors.password_confirmation
                    ? "border-red-500"
                    : "border-[rgba(95,91,91,0.3)]"
                } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password_confirmation[0]}
                </p>
              )}
            </div>
            <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
              <input
                type="tel"
                name="phone"
                placeholder="Address"
                value={formData.phone}
                onChange={handleChange}
                className={`w-4/5 px-3 py-2 border ${
                  errors.phone
                    ? "border-red-500"
                    : "border-[rgba(95,91,91,0.3)]"
                } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>
              )}
            </div>
            <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
              <input
                type="tel"
                name="phone"
                placeholder="Description"
                value={formData.phone}
                onChange={handleChange}
                className={`w-4/5 px-3 py-2 border ${
                  errors.phone
                    ? "border-red-500"
                    : "border-[rgba(95,91,91,0.3)]"
                } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>
              )}
            </div>
            <div className="flex justify-center items-center space-x-20 mb-4">
              <label className="flex  text-xl max-[430px]:text-xs lg:text-md font-inter">
                <input
                  type="radio"
                  name="status"
                  value="Pairing"
                  checked={formData.status === "Pairing"}
                  onChange={handleChange}
                  className="mr-2 peer appearance-none w-6 h-6 border-2 border-gray-500 rounded-full checked:bg-pink-light "
                />
                Pairing
              </label>
              <label className="flex text-xl max-[430px]:text-xs lg:text-md font-inter">
                <input
                  type="radio"
                  name="status"
                  value="Adoption"
                  checked={formData.status === "Adoption"}
                  onChange={handleChange}
                  className="mr-2 peer appearance-none w-6 h-6 border-2 border-gray-500 rounded-full checked:bg-pink-light "
                />
                Adoption
              </label>
              {errors.status && (
                <p className="text-red-500 text-xs mt-1">{errors.status[0]}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-1/2 bg-pink-button text-[#5F5B5B] py-2 rounded-lg hover:rounded-full font-poppins font-semibold text-[18px] max-[430px]:text-[14px] 2xl:text-[18px] shadow-lg border border-[rgba(95,91,91,0.3)]"
            >
              {loading ? "Loading..." : "Add Your Pet"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPet;
