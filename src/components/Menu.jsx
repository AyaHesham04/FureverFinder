import React, { useState, useEffect, useRef } from "react";
import addPet from "../assets/HomePage/AddPet.png";
import logout from "../assets/HomePage/Logout.png";
import user from "../assets/HomePage/User.png";
import { Link, useNavigate } from "react-router-dom";

// Utility function to get a cookie value
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// Function to delete a cookie
const deleteCookie = (name) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control menu visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track auth_token presence
  const [loading, setLoading] = useState(true); // State to track validation status
  const menuRef = useRef(null); // Ref to track the dropdown menu element
  const navigate = useNavigate(); // For navigation

  // Validate token
  const validateToken = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User data:", userData); // Log user data if needed
        setIsLoggedIn(true); // Token is valid
      } else {
        console.error("Invalid token");
        setIsLoggedIn(false); // Token is invalid
      }
    } catch (error) {
      console.error("Error validating token:", error);
      setIsLoggedIn(false); // Token validation failed
    } finally {
      setLoading(false); // Validation complete
    }
  };

  // Logout functionality
  const handleLogout = async () => {
    const token = getCookie("auth_token");
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Successfully logged out");
        deleteCookie("auth_token"); // Remove token from cookies
        setIsLoggedIn(false); // Update state
        navigate("/"); // Redirect to login page
      } else {
        console.error("Error logging out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    // Check for auth_token in cookies
    const token = getCookie("auth_token");
    if (token) {
      validateToken(token); // Validate the token if found
    } else {
      setIsLoggedIn(false); // No token found
      setLoading(false); // No need to validate if there's no token
    }
  }, []);

  // Toggle the menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while validating
  }

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button onClick={toggleMenu} className="p-2">
        <svg
          className="w-8 h-8 max-[430px]:w-5 max-[430px]:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        ref={menuRef} // Attach the ref to the dropdown menu
        className={`absolute top-full left-3 max-[430px]:left-2 mt-2 max-[430px]:mt-0 max-[400px]:-mt-1 2xl:w-56 xl:w-52 lg:w-48 md:w-44 sm:w-36 max-[430px]:w-24 max-[400px]:w-22 bg-white shadow-md rounded-md transition-all ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="font-poppins font-semibold text-[#5F5B5B] 2xl:text-[19px] xl:text-[17px] lg:text-[15px] md:text-[14px] sm:text-[11px] max-[430px]:text-[9px] p-1.5 md:p-3 max-[430px]:p-1 space-y-2 max-[430px]:space-y-1">
          <Link
            to="/add-pet"
            className="block px-4 max-[430px]:px-1 py-2 rounded-lg hover:bg-[#7BCFD180]"
          >
            <img
              src={addPet}
              alt="Add Pet"
              className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-5 sm:h-5 max-[430px]:w-3 max-[430px]:h-3 inline-block mr-1"
            />
            Add Your Pet
          </Link>
          <Link
            to="/profile"
            className="block px-4 max-[430px]:px-1 py-2 rounded-lg hover:bg-[#7BCFD180]"
          >
            <img
              src={user}
              alt="user"
              className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-5 sm:h-5 max-[430px]:w-3 max-[430px]:h-3 inline-block mr-1"
            />
            Profile
          </Link>
          {isLoggedIn ? (
            <Link
              onClick={handleLogout}
              className="block px-4 max-[430px]:px-1 py-2 rounded-lg hover:bg-[#7BCFD180]"
            >
              <img
                src={logout}
                alt="logout"
                className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-5 sm:h-5 max-[430px]:w-3 max-[430px]:h-3 inline-block mr-1"
              />
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="block px-4 max-[430px]:px-1 py-2 rounded-lg hover:bg-[#7BCFD180]"
            >
              <img
                src={logout}
                alt="login"
                className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-5 sm:h-5 max-[430px]:w-3 max-[430px]:h-3 inline-block mr-1"
              />
              Login
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
