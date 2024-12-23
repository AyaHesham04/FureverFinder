import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import cam from "../assets/AddPetPage/cam.png";
import dogImage from "../assets/SignUpPage/SignupDog.png";
import BackButton from "../components/BackButton";

const AddPet = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pet_name: "",
    gender: "",
    year: "",
    month: "",
    latitude: "",
    longitude: "",
    weight: "",
    description: "",
    type: "",
    status: "",
  });
  const [location, setLocation] = useState("");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...newImages]);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const data = new FormData();

      // Append images to FormData
      selectedFiles.forEach((file, index) => {
        if (file instanceof File) {
          data.append("images[]", file);
        } else {
          console.warn(
            `File at index ${index} is not a valid File object:`,
            file
          );
        }
      });

      // Append other form data
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      // Get token from cookies
      const token = Cookies.get("auth_token");
      // API request
      const response = await axios.post(
        "http://127.0.0.1:8000/api/pets/store",
        // "https://api-fureverfinders.amrnabih.com/api/pets/store",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success
      toast.success("Pet added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        if (error.response.data.error === "Token not valid") {
          toast.error("Token is invalid. Please log in again.");
          navigate("/login");
        } else if (error.response.data.error) {
          setErrors(error.response.data.error); // Validation errors from backend
        } else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("Cannot connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleUseCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({ ...formData, latitude: latitude, longitude: longitude });
          try {
            // OpenCage API call with your API key
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=907eecc4dc364380ad65c07d8f1233ba`
            );

            if (!response.ok)
              throw new Error("Failed to fetch location details.");

            const data = await response.json();

            if (data.results && data.results.length > 0) {
              const components = data.results[0].components;

              const country = components.country || "Unknown Country";
              const city =
                components.city ||
                components.town ||
                components.village ||
                "Unknown City";

              // Set the location in your state or variable
              setLocation(`City: ${city}, Country: ${country}`);
            } else {
              alert("Unable to retrieve the location details.");
            }

            setIsLocationModalOpen(false);
          } catch (error) {
            console.error(error);
            alert("Unable to retrieve location details.");
          }
        },
        (error) => {
          console.error(error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
  const handleChangeLocation = () => {
    setLocation(null); // Reset the location, which can trigger the "Use My Current Location" flow again
  };
  return (
    <div className="relative h-screen w-screen scrollbar-hide bg-stripes flex items-center justify-center">
      <BackButton></BackButton>

      <div className="relative z-10 flex items-center justify-center pt-7 max-[430px]:pt-5 lg:pt-12 max-h-full">
        <div className="relative bg-white w-[500px] lg:w-[600px] max-[430px]:w-[350px] max-[400px]:w-[340px] py-7 lg:py-6 max-[430px]:py-4 rounded-lg shadow-md text-center border-4 max-[430px]:border-0 border-pink-light">
          {/* Dog image */}
          <img
            src={dogImage}
            alt="Dog hanging"
            className="absolute top-[-110px] lg:top-[-105px] max-[430px]:top-[-90px] right-1/4 transform translate-x-full w-[110px] lg:w-[105px] max-[430px]:w-[90px] block max-[430px]:hidden"
          />
          <form
            className="w-full h-full overflow-y-auto scrollbar-hide"
            onSubmit={handleSubmit}
          >
            {/* Image Upload Section */}
            <div className="flex flex-col items-center mb-7">
              {/* Preview selected images */}
              {selectedImages.length == 0 ? (
                <img
                  src={cam}
                  className="2xl:w-28 2xl:h-28 xl:w-24 xl:h-24 lg:w-20 lg:h-20 md:w-20 md:h-20 sm:w-20 sm:h-20 max-[430px]:w-18 max-[430px]:h-16"
                />
              ) : null}
              {selectedImages.length == 0 ? (
                <button
                  className="absolute max-[430px]:top-[70px] max-[430px]:right-[130px] sm:right-[195px] sm:top-[100px] md:right-[200px] md:top-[90px] lg:right-[250px] lg:top-[90px] xl:right-[230px] xl:top-[100px] 2xl:right-[220px] 2xl:top-[110px] 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[430px]:w-5 max-[430px]:h-5 bg-pink-light rounded-lg"
                  type="button"
                  onClick={() => document.getElementById("imageUpload").click()} // Trigger file input click
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[430px]:w-5 max-[430px]:h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              ) : null}
              <div className="flex flex-wrap justify-center gap-4">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      className="2xl:w-28 2xl:h-28 xl:w-24 xl:h-24 lg:w-20 lg:h-20 md:w-20 md:h-20 sm:w-20 sm:h-20 max-[430px]:w-18 max-[430px]:h-16 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[430px]:w-5 max-[430px]:h-5 rounded-full flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              {/* Upload Button */}
              {selectedImages.length > 0 ? (
                <button
                  type="button"
                  className={` ${errors.images
                    ? "border-red-500"
                    : "border-[rgba(95,91,91,0.3)]"
                    } mt-2 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[430px]:w-5 max-[430px]:h-5 bg-pink-light rounded-lg flex items-center justify-center`}
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[430px]:w-5 max-[430px]:h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              ) : null}
              {errors.images && (
                <p className="text-red-500 text-xs mt-1">{errors.images[0]}</p>
              )}
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Pet Name Field */}
            <div className="mb-5">
              <input
                type="text"
                name="pet_name"
                placeholder="Pet Name"
                value={formData.pet_name}
                onChange={handleChange}
                className={`w-4/5 px-3 py-2 border ${errors.pet_name
                  ? "border-red-500"
                  : "border-[rgba(95,91,91,0.3)]"
                  } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
              />
              {errors.pet_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.pet_name[0]}
                </p>
              )}
            </div>
            <div className="grid lg:w-4/5 grid-cols-1 lg:grid-cols-2 m-auto gap-x-4">
              {/* Gender Selection */}
              <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`cursor-pointer w-4/5 lg:w-full px-3 py-2 border ${errors.gender
                    ? "border-red-500"
                    : "border-[rgba(95,91,91,0.3)]"
                    } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.gender[0]}
                  </p>
                )}
              </div>

              {/* Type Selection */}
              <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`cursor-pointer w-4/5 lg:w-full px-3 py-2 border ${errors.type
                    ? "border-red-500"
                    : "border-[rgba(95,91,91,0.3)]"
                    } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-xs mt-1">{errors.type[0]}</p>
                )}
              </div>
            </div>
            {/* Year and Month Fields */}
            <div className="grid lg:w-4/5 grid-cols-1 lg:grid-cols-2 m-auto gap-x-4">
              <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
                <input
                  type="text"
                  name="year"
                  placeholder="Yrs"
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-4/5 lg:w-full px-3 py-2 border ${errors.year
                    ? "border-red-500"
                    : "border-[rgba(95,91,91,0.3)]"
                    } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
                />
                {errors.year && (
                  <p className="text-red-500 text-xs mt-1">{errors.year[0]}</p>
                )}
              </div>
              <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
                <input
                  type="text"
                  name="month"
                  placeholder="Month"
                  value={formData.month}
                  onChange={handleChange}
                  className={`w-4/5 lg:w-full px-3 py-2 border ${errors.month
                    ? "border-red-500"
                    : "border-[rgba(95,91,91,0.3)]"
                    } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
                />
                {errors.month && (
                  <p className="text-red-500 text-xs mt-1">{errors.month[0]}</p>
                )}
              </div>
            </div>
            {/* Weight Field */}
            <div className="mb-5">
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
                className={`w-4/5 px-3 py-2 border ${errors.weight
                  ? "border-red-500"
                  : "border-[rgba(95,91,91,0.3)]"
                  } rounded-lg text-sm max-[430px]:text-xs lg:text-md`}
              />
              {errors.weight && (
                <p className="text-red-500 text-xs mt-1">{errors.weight[0]}</p>
              )}
            </div>


            {/* Description Field */}
            <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className={`w-4/5 px-3 py-2 border ${errors.description
                  ? "border-red-500"
                  : "border-[rgba(95,91,91,0.3)]"
                  } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description[0]}
                </p>
              )}
            </div>
            {/* Address Field */}
            <div className="mb-5 max-[430px]:mb-3 lg:mb-5 xl:mb-7 2xl:mb-5">
              {/* <div className="relative flex items-center"> */}
              {!location && (
                <div className="text-[#424242] cursor-pointer group hover:text-[#7BCFD180]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-5 md:h-5 sm:w-4 sm:h-4 max-[430px]:w-4 max-[430px]:h-4 inline-block text-[#424242] group-hover:text-[#7BCFD180] rounded"
                    fill="currentColor"
                    // onClick={handleLocationClick}
                    onClick={handleUseCurrentLocation}
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 4.93 7 13 7 13s7-8.07 7-13c0-3.87-3.13-7-7-7zm0 10.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  </svg>
                  <span className="group-hover:text-[#7BCFD180] ml-1" onClick={handleUseCurrentLocation}>Add Your location</span>
                </div>
              )}
              {/* {isLocationModalOpen && (
              <div className="location-modal absolute top-full mt-2 bg-white rounded-lg shadow-md w-full">
                <div
                  onClick={handleUseCurrentLocation}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  Use My Current Location
                </div>
              </div>
            )} */}
              {location && (
                <div className="w-full">
                  <span className="text-[#424242] w-full">{location}</span>
                  <button
                    className="text-center text-red-600 hover:underline w-full 2xl:text-[17px] xl:text-[15px] lg:text-[13px] md:text-[12px] sm:text-[10px] max-[430px]:text-[8px]"
                    // onClick={handleChangeLocation}
                    onClick={handleChangeLocation}
                  >
                    Remove
                  </button>
                </div>
              )}
              {/* <LocationPicker onLocationSelect={handleLocationSelect} /> */}
              {/* </div> */}
            </div>
            {/* Status (Radio Buttons) */}
            <div className="flex justify-center items-center space-x-20 mb-4">
              <label className="cursor-pointer flex text-sm max-[430px]:text-xs lg:text-md font-inter">
                <input
                  type="radio"
                  name="status"
                  value="pairing"
                  checked={formData.status === "pairing"}
                  onChange={handleChange}
                  className="mr-2 peer appearance-none 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[430px]:w-5 max-[430px]:h-5 border-2 border-gray-500 rounded-full checked:bg-pink-light"
                />
                Pairing
              </label>
              <label className="cursor-pointer flex text-sm max-[430px]:text-xs lg:text-md font-inter">
                <input
                  type="radio"
                  name="status"
                  value="adopted"
                  checked={formData.status === "adopted"}
                  onChange={handleChange}
                  className="mr-2 peer appearance-none 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[430px]:w-5 max-[430px]:h-5 border-2 border-gray-500 rounded-full checked:bg-pink-light"
                />
                Adoption
              </label>
            </div>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">{errors.status[0]}</p>
            )}
            {/* Submit Button */}
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
