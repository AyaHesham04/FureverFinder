import React from "react";
import dogImage from "../assets/SignUpPage/SignupDog.png";

const Signup = () => {
  return (
    <div
      className="relative h-screen w-screen bg-stripes flex items-center justify-center"
    >
      {/* Form container */}
      <div className="relative z-10 flex items-center justify-center pt-7 max-[430px]:pt-5 lg:pt-12 max-h-full">
        <div className="relative bg-white w-[500px] lg:w-[600px] max-[430px]:w-[350px] max-[400px]:w-[340px] py-7 lg:py-6 max-[430px]:py-4 rounded-lg shadow-md text-center border-4 max-[430px]:border-0 border-pink-light">
          {/* Dog image */}
          <img
            src={dogImage}
            alt="Dog hanging"
            className="absolute top-[-110px] lg:top-[-105px] max-[430px]:top-[-90px] right-1/4 transform translate-x-full w-[110px] lg:w-[105px] max-[430px]:w-[90px]"
          />
          {/* Title */}
          <h1 className="text-pink-light text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] font-bold italic font-inter mb-7 max-[430px]:mb-4 2xl:mb-6">
            Join Our Fur-Ever Family!
          </h1>

          {/* Form */}
          <form className="w-full h-full">
            <div className="grid lg:w-4/5 grid-cols-1 lg:grid-cols-2 m-auto gap-x-4">
              <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-4/5 lg:w-full px-3 py-2 border border-[rgba(95,91,91,0.3)] rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter"
                />
              </div>
              <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-4/5 lg:w-full px-3 py-2 border border-[rgba(95,91,91,0.3)] rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter"
                />
              </div>
            </div>
            <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
              <input
                type="email"
                placeholder="Email Address"
                className="w-4/5 px-3 py-2 border border-[rgba(95,91,91,0.3)] rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter"
              />
            </div>
            <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
              <input
                type="password"
                placeholder="Password"
                className="w-4/5 px-3 py-2 border border-[rgba(95,91,91,0.3)] rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter"
              />
            </div>
            <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
              <input
                type="confirm-password"
                placeholder="Confirm Password"
                className="w-4/5 px-3 py-2 border border-[rgba(95,91,91,0.3)] rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter"
              />
            </div>
            <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-4/5 px-3 py-2 border border-[rgba(95,91,91,0.3)] rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter"
              />
            </div>
            <button
              type="submit"
              className="w-1/2 bg-pink-button text-[#5F5B5B] py-2 rounded-lg hover:rounded-full font-poppins font-semibold text-[18px] max-[430px]:text-[14px] 2xl:text-[18px] shadow-lg border border-[rgba(95,91,91,0.3)]"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
