import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import dogImage from "../assets/SignUpPage/SignupDog.png";
import BackButton from "../components/BackButton";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
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
      <BackButton redirectTo="/start"></BackButton>

      <div className="relative z-10 flex items-center justify-center pt-7 max-[430px]:pt-5 lg:pt-12 max-h-full">
        <div className="relative bg-white w-[500px] lg:w-[600px] max-[430px]:w-[350px] max-[400px]:w-[340px] py-7 lg:py-6 max-[430px]:py-4 rounded-lg shadow-md text-center border-4 max-[430px]:border-0 border-pink-light">
          {/* Dog image */}
          <img
            src={dogImage}
            alt="Dog hanging"
            className="absolute top-[-110px] lg:top-[-105px] max-[430px]:top-[-90px] right-1/4 transform translate-x-full w-[110px] lg:w-[105px] max-[430px]:w-[90px]"
          />
          <h1 className="text-pink-light text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] font-bold italic font-inter mb-7 max-[430px]:mb-4 2xl:mb-6">
            Join Our Fur-Ever Family!
          </h1>
          <form className="w-full h-full" onSubmit={handleSubmit}>
            <div className="grid lg:w-4/5 grid-cols-1 lg:grid-cols-2 m-auto gap-x-4">
              <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
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
                  placeholder="Last Name"
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
                type="email"
                name="email"
                placeholder="Email Address"
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
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-4/5 px-3 py-2 border ${
                  errors.password
                    ? "border-red-500"
                    : "border-[rgba(95,91,91,0.3)]"
                } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>
            <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
              <input
                type="password"
                name="password_confirmation"
                placeholder="Confirm Password"
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
                placeholder="Phone Number"
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
            <button
              type="submit"
              className="w-1/2 bg-pink-button text-[#5F5B5B] py-2 rounded-lg hover:rounded-full font-poppins font-semibold text-[18px] max-[430px]:text-[14px] 2xl:text-[18px] shadow-lg border border-[rgba(95,91,91,0.3)]"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
