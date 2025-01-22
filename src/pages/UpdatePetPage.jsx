import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import cam from "../assets/AddPetPage/cam.png";
import dogImage from "../assets/SignUpPage/SignupDog.png";
import BackButton from "../components/BackButton";

const UpdatePet = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: pet.id,
    pet_name: pet.name,
    gender: pet.gender,
    year: pet.year,
    month: pet.month,
    address: pet.address,
    weight: pet.weight,
    description: pet.description,
    type: pet.type,
    status: pet.status,
  });
  useEffect(() => { }, []);
  console.log("form:", formData);
  const [address, setAddress] = useState("");
  const [selectedImages, setSelectedImages] = useState(() => pet.images || []);
  const [selectedFiles, setSelectedFiles] = useState(() =>
    (pet.images || []).map((image, index) => {
      // Decode Base64 and convert to File object
      const byteString = atob(image.split(",")[1]); // Remove the Base64 header
      const mimeString = image.split(",")[0].split(":")[1].split(";")[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }
      return new File([arrayBuffer], `image_${index}.jpeg`, { type: mimeString });
    })
  );
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
        `http://127.0.0.1:8000/api/pets/update/${formData.id}`, // Use the pet ID in the URL
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

  return (
    <div className="relative h-screen w-screen scrollbar-hide bg-stripes flex items-center justify-center">
      <BackButton></BackButton>
      <div className="w-full h-full relative flex items-center justify-center overflow-y-auto">
        <div className="relative bg-white w-[500px] max-[560px]:w-[500px] max-[560px]:h-fit lg:w-[600px] max-[430px]:w-full max-[400px]:w-[340px] py-7 lg:py-6 max-[430px]:py-4 rounded-lg sm:shadow-md text-center border-4 max-[430px]:border-0 border-pink-light">
          <form
            className="w-full h-full scrollbar-hide"
            onSubmit={handleSubmit}
          >
            {/* Image Upload Section */}
            <div className="flex flex-col items-center mb-7">
              {/* Preview selected images */}
              {selectedImages.length == 0 ? (
                <img
                  src={cam}
                  className="2xl:w-28 2xl:h-28 xl:w-24 xl:h-24 lg:w-20 lg:h-20 md:w-20 md:h-20 sm:w-20 sm:h-20 max-[560px]:w-18 max-[560px]:h-24 max-[430px]:w-18 max-[430px]:h-16"
                />
              ) : null}
              {selectedImages.length == 0 ? (
                <button
                  className="absolute max-[430px]:top-[70px] max-[430px]:right-[130px] max-[560px]:top-[110px] max-[560px]:right-[180px] sm:right-[195px] sm:top-[100px] md:right-[200px] md:top-[90px] lg:right-[250px] lg:top-[90px] xl:right-[230px] xl:top-[100px] 2xl:right-[230px] 2xl:top-[120px] 2xl:w-7 2xl:h-7 xl:w-6 xl:h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[430px]:w-5 max-[430px]:h-5 bg-pink-light rounded-lg"
                  type="button"
                  onClick={() => document.getElementById("imageUpload").click()} // Trigger file input click
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="2xl:w-7 2xl:h-7 xl:w-6 xl:h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[560px]:w-5 max-[560px]:h-5 max-[430px]:w-5 max-[430px]:h-5"
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
                      className="2xl:w-36 2xl:h-28 xl:w-32 xl:h-24 lg:w-32 lg:h-20 md:w-28 md:h-20 sm:w-28 sm:h-20 max-[560px]:w-18 max-[560px]:h-16 max-[430px]:w-18 max-[430px]:h-14"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white 2xl:w-7 2xl:h-7 xl:w-6 xl:h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[560px]:w-5 max-[560px]:h-5 max-[430px]:w-5 max-[430px]:h-5 rounded-full flex items-center justify-center"
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
            {/* Address Field */}
            <div className="mb-5">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className={`w-4/5 px-3 py-2 border ${errors.address
                  ? "border-red-500"
                  : "border-[rgba(95,91,91,0.3)]"
                  } rounded-lg text-sm max-[430px]:text-xs lg:text-md font-inter`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address[0]}
                </p>
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
            {/* Status (Radio Buttons) */}
            <div className="flex justify-center items-center space-x-20 mb-4">
              <label className="cursor-pointer flex text-sm max-[430px]:text-xs lg:text-md font-inter">
                <input
                  type="radio"
                  name="status"
                  value="pairing"
                  checked={formData.status === "pairing"}
                  onChange={handleChange}
                  className="mr-2 peer appearance-none 2xl:w-7 2xl:h-7 xl:w-6 xl:h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[560px]:w-5 max-[560px]:h-5 max-[430px]:w-5 max-[430px]:h-5 max-[400px]:w-4 max-[400px]:h-4 border-2 border-gray-500 rounded-full checked:bg-pink-light"
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
                  className="mr-2 peer appearance-none 2xl:w-7 2xl:h-7 xl:w-6 xl:h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[560px]:w-5 max-[560px]:h-5 max-[430px]:w-5 max-[430px]:h-5 max-[400px]:w-4 max-[400px]:h-4 border-2 border-gray-500 rounded-full checked:bg-pink-light"
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
              {loading ? "Loading..." : "Update Your Pet"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePet;
