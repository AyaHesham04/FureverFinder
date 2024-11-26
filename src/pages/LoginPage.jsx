import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import dogImage from "../assets/SignUpPage/SignupDog.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    setLoading(true); // Set loading state to true when starting the request

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      // Assuming the token is in response.data.token
      const token = response.data.token;

      // Save the token in a cookie with an expiration of 7 days (you can adjust this)
      Cookies.set("auth_token", token, { expires: 7 });

      // On successful login, show success message
      toast.success("Login successful!");
      navigate("/"); // Redirect to home page or wherever you want
    } catch (error) {
      if (error.response) {
        const errorMessage = error?.response?.data?.error || "Login failed!";
        toast.error(errorMessage);
      } else {
        toast.error(error.message || "Login failed!");
      }
    } finally {
      setLoading(false); // Set loading state to false when request is done
    }
  };

  return (
    <div className="relative h-screen w-screen bg-stripes flex items-center justify-center">
      {/* Form container */}
      <div className="relative z-10 flex items-center justify-center pt-7 max-[430px]:pt-5 lg:pt-12 max-h-full">
        <div className="relative bg-white w-[500px] lg:w-[600px] max-[430px]:w-[350px] max-[400px]:w-[340px] py-9 lg:py-8 max-[430px]:py-7 rounded-lg shadow-md text-center border-4 max-[430px]:border-0 border-pink-light">
          {/* Dog image */}
          <img
            src={dogImage}
            alt="Dog hanging"
            className="absolute top-[-110px] lg:top-[-105px] max-[430px]:top-[-90px] right-1/4 transform translate-x-full w-[110px] lg:w-[105px] max-[430px]:w-[90px]"
          />
          {/* Title */}
          <h1 className="text-pink-light text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] font-bold italic font-inter mb-7 max-[430px]:mb-5 2xl:mb-6">
            Hello Again, Fur Lover!
          </h1>

          {/* Form */}
          <form className="w-full h-full" onSubmit={handleLogin}>
            <div className="mb-5 max-[430px]:mb-5 lg:mb-5 xl:mb-7 2xl:mb-5">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-4/5 px-3 py-2 border border-[rgba(95,91,91,0.3)] rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter"
              />
            </div>
            <div className="mb-5 max-[430px]:mb-5 lg:mb-5 xl:mb-7 2xl:mb-5">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-4/5 px-3 py-2 border border-[rgba(95,91,91,0.3)] rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter"
              />
            </div>
            <button
              type="submit"
              className="w-1/2 bg-pink-button text-[#5F5B5B] py-2 rounded-lg hover:rounded-full font-poppins font-semibold text-[18px] max-[430px]:text-[14px] 2xl:text-[18px] shadow-lg border border-[rgba(95,91,91,0.3)]"
              disabled={loading} // Disable the button when loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
