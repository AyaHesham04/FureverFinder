import React, { useState, useEffect, useRef } from "react";
import pet from "../../assets/HomePage/dogBlack.png";
import gender from "../../assets/HomePage/gender.png";
import age from "../../assets/HomePage/age.png";
import axios from "axios";

import dog from "../../assets/HomePage/dogGrey.png";
import cat from "../../assets/HomePage/cat.png";
import femaleDark from "../../assets/HomePage/femaleDark.png";
import maleDark from "../../assets/HomePage/maleDark.png";
import LocationPicker from "../LocationPicker";
import { toast } from "react-toastify";

const FilterBar = ({ onUpdateCatData, onUpdateDogData, onUpdateLoading, onFilterStateChange }) => {
  const [selectedPet, setSelectedPet] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [search, setSearch] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const areAllFiltersEmpty = () => {
    return (
      !selectedPet &&
      !selectedGender &&
      !selectedAge &&
      !image &&
      !location &&
      !search
    );
  };

  useEffect(() => {
    onFilterStateChange(areAllFiltersEmpty());
  }, [selectedPet, selectedGender, selectedAge, image, location, search]);


  const fetchPets = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/pets/index");

      const data = response.data; // Axios automatically parses JSON response
      // Map the data and send it directly to parent
      const formattedCatData = data.cats.map((cat) => ({
        id: cat.id,
        name: cat.pet_name,
        gender: cat.gender,
        images: cat.images.map((image) => `data:image/jpeg;base64,${image}`), // Convert base64 to image URL
        year: cat.year,
        month: cat.month,
        longitude: cat.address.coordinates[0],
        latitude: cat.address.coordinates[1],
        weight: cat.weight,
        description: cat.description,
        user_id: cat.user_id,
        created_at: cat.created_at,
        status: cat.status,
        user: {
          email: cat.user.email,
          fname: cat.user.fname,
          lname: cat.user.lname,
          phone: cat.user.phone,
        },
      }));

      const formattedDogData = data.dogs.map((dog) => ({
        id: dog.id,
        name: dog.pet_name,
        gender: dog.gender,
        images: dog.images.map((image) => `data:image/jpeg;base64,${image}`), // Convert base64 to image URL
        year: dog.year,
        month: dog.month,
        longitude: dog.address.coordinates[0],
        latitude: dog.address.coordinates[1],
        weight: dog.weight,
        description: dog.description,
        user_id: dog.user_id,
        created_at: dog.created_at,
        status: dog.status,
        user: {
          email: dog.user.email,
          fname: dog.user.fname,
          lname: dog.user.lname,
          phone: dog.user.phone,
        },
      }));

      // Pass data to parent handlers
      onUpdateCatData(formattedCatData.slice(0, 3));
      onUpdateDogData(formattedDogData.slice(0, 3));
    } catch (error) {
      console.error("Error fetching pets data:", error);
    } finally {
      // Update loading state in the parent
      onUpdateLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);
  const handleSearch = async () => {
    onUpdateLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("full", true);
      if (selectedPet !== "") {
        params.append("pet_type", selectedPet.value);
      }
      if (search !== "") {
        params.append("search", search);
      }

      if (selectedGender !== "") {
        params.append("gender", selectedGender.value);
      }

      if (selectedAge !== "") {
        console.log("label:", selectedAge.label);

        if (selectedAge.label.includes("mo")) {
          params.append("min_age_month", selectedAge.value);
        } else if (selectedAge.label.includes("yr")) {
          params.append("min_age_year", selectedAge.value);
        }
      }
      if (latitude !== "" && longitude !== "") {
        params.append("latitude", latitude);
        params.append("longitude", longitude);
      }

      // Prepare the FormData
      const formData = new FormData();

      // Append image if it exists
      if (image) {
        formData.append("image", file); // Use the image file here
      }

      const queryString = params.toString(); // Convert params to query string
      const apiUrl = `http://127.0.0.1:8000/api/pets/index?${queryString}`;

      // Make the POST request with FormData
      const response = await axios.post(
        apiUrl,
        image ? formData : null,
        image
          ? {
            headers: {
              "Content-Type": "multipart/form-data", // Ensure the correct content type is set for file uploads
            },
          }
          : null
      );

      // Directly access response.data
      const data = response.data;

      const formattedCatData = Array.isArray(data.cats)
        ? data.cats.map((cat) => ({
          id: cat.id,
          name: cat.pet_name,
          gender: cat.gender,
          images: cat.images.map(
            (image) => `data:image/jpeg;base64,${image}`
          ), // Convert base64 to image URL
          year: cat.year,
          month: cat.month,
          longitude: cat.address.coordinates[0],
          latitude: cat.address.coordinates[1],
          weight: cat.weight,
          description: cat.description,
          user_id: cat.user_id,
          created_at: cat.created_at,
          status: cat.status,
          user: {
            email: cat.user?.email,
            fname: cat.user?.fname,
            lname: cat.user?.lname,
            phone: cat.user?.phone,
          },
        }))
        : [];

      const formattedDogData = Array.isArray(data.dogs)
        ? data.dogs.map((dog) => ({
          id: dog.id,
          name: dog.pet_name,
          gender: dog.gender,
          images: dog.images.map(
            (image) => `data:image/jpeg;base64,${image}`
          ), // Convert base64 to image URL
          year: dog.year,
          month: dog.month,
          longitude: dog.address.coordinates[0],
          latitude: dog.address.coordinates[1],
          weight: dog.weight,
          description: dog.description,
          user_id: dog.user_id,
          created_at: dog.created_at,
          status: dog.status,
          user: {
            email: dog.user?.email,
            fname: dog.user?.fname,
            lname: dog.user?.lname,
            phone: dog.user?.phone,
          },
        }))
        : [];

      // Pass data to parent handlers
      onUpdateCatData(formattedCatData);
      onUpdateDogData(formattedDogData);
    } catch (error) {
      console.error("Error fetching pets data:", error);
    } finally {
      // Update loading state in the parent
      onUpdateLoading(false);
    }

    // onSearch();
  };

  const petOptions = [
    { value: "dog", label: "Dog", icon: dog },
    { value: "cat", label: "Cat", icon: cat },
  ];

  const genderOptions = [
    { value: "male", label: "Male", icon: maleDark },
    { value: "female", label: "Female", icon: femaleDark },
  ];

  const ageOptions = [];
  // Generate options for months (0 to 11 months)
  for (let i = 0; i < 12; i++) {
    ageOptions.push({
      value: `${i}`,
      label: `${i} ${i === 1 ? "mo" : "mo"}`,
    });
  }

  // Generate options for years (1 year to 20 years)
  for (let i = 1; i <= 20; i++) {
    ageOptions.push({
      value: `${i}`,
      label: `${i} ${i === 1 ? "yr" : "yr"}`,
    });
  }

  const petDropdownRef = useRef(null);
  const genderDropdownRef = useRef(null);
  const ageDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        petDropdownRef.current &&
        !petDropdownRef.current.contains(event.target)
      ) {
        setIsPetOpen(false);
      }
      if (
        genderDropdownRef.current &&
        !genderDropdownRef.current.contains(event.target)
      ) {
        setIsGenderOpen(false);
      }
      if (
        ageDropdownRef.current &&
        !ageDropdownRef.current.contains(event.target)
      ) {
        setIsAgeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isPetOpen, setIsPetOpen] = useState(false);
  const togglePetDropdown = () => setIsPetOpen(!isPetOpen);

  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const toggleGenderDropdown = () => setIsGenderOpen(!isGenderOpen);

  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const toggleAgeDropdown = () => setIsAgeOpen(!isAgeOpen);

  const handleSelectionPet = (option) => {
    setSelectedPet(option);
    setIsPetOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value); // Update the state with the input value
  };

  const handleSelectionGender = (option) => {
    setSelectedGender(option);
    setIsGenderOpen(false);
  };

  const handleSelectionAge = (value) => {
    setSelectedAge(value);
    setIsAgeOpen(false);
  };

  const fileInputRef = useRef(null); // Create a reference for the file input

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Set the image as a data URL
      setFile(file); // Set the image as a data URL
    }
  };

  const handleChangeImageClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input click
  };

  const handleImageRemove = () => {
    setImage(null);
    setFile(null);
  };

  const handleLocationClick = (e) => {
    e.stopPropagation();
    setIsLocationModalOpen((prev) => !prev);
  };

  // Close location modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLocationModalOpen && !event.target.closest(".location-modal")) {
        setIsLocationModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLocationModalOpen]);

  const handleUseCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
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

  // Select a predefined location
  const handleSelectLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    setIsLocationModalOpen(false);
  };

  // const handleChangeLocation = () => {
  //   // Logic to open a location picker modal or clear the current location
  //   setIsLocationModalOpen(true);
  // };

  const handleChangeLocation = () => {
    setLocation(null);
    setLatitude("");
    setLongitude(""); // Reset the location, which can trigger the "Use My Current Location" flow again
  };

  const handleLocationRemove = () => {
    setLocation(null);
  };

  return (
    <div className="mx-5 sm:mx-8 mt-4">
      <div className="bg-[#F5F5F5] w-full grid grid-cols-1 gap-x-2 max-[430px]:gap-x-0 items-center justify-center rounded-lg 2xl:text-[19px] xl:text-[17px] lg:text-[15px] md:text-[14px] sm:text-[11px] max-[430px]:text-[9px]">
        <div className="w-full font-inter font-[700] grid grid-cols-3 gap-3 max-[430px]:gap-2 p-3 text-black">
          <div
            ref={petDropdownRef}
            className="relative grid grid-cols-[0.5fr_1fr_0.5fr] mx-auto w-full justify-center items-start bg-[#E9E9E9] rounded-lg p-2 max-[430px]:p-1 text-center"
          >
            <img
              src={selectedPet.icon || pet}
              onClick={togglePetDropdown}
              alt="Pet"
              className="cursor-pointer mx-auto 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3"
            />
            <span onClick={togglePetDropdown} className="cursor-pointer">{selectedPet?.label || "Pet"}</span>
            <div
              onClick={togglePetDropdown}
              className="transition-transform mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`cursor-pointer 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3 transition-transform duration-300 ${isPetOpen ? "rotate-180" : "rotate-0"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {isPetOpen && (
              <ul className="z-10 absolute top-full mt-2 bg-white rounded-lg shadow-md w-full text-[#5F5B5B] font-poppins font-semibold">
                {petOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectionPet(option)}
                    className="px-4 py-2 cursor-pointer rounded-lg hover:bg-[#7BCFD180] flex items-center space-x-3"
                  >
                    <img
                      src={option.icon}
                      alt={option.label}
                      className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3 object-contain"
                    />
                    <span>{option.label}</span>
                  </li>
                ))}
              </ul>
            )}
            {/* Clear Button */}
            {selectedPet && (
              <button
                onClick={() => setSelectedPet("")}
                className="mt-2 text-red-500 2xl:text-[19px] xl:text-[17px] lg:text-[15px] md:text-[14px] sm:text-[11px] max-[430px]:text-[9px] hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div
            ref={genderDropdownRef}
            className="relative grid grid-cols-[0.5fr_1fr_0.5fr] mx-auto w-full justify-center items-start bg-[#E9E9E9] rounded-lg p-2 max-[430px]:p-1 text-center"
          >
            <img
              src={selectedGender.icon || gender}
              onClick={toggleGenderDropdown}
              alt="Gender"
              className="cursor-pointer mx-auto 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3"
            />
            <span onClick={toggleGenderDropdown} className="cursor-pointer">{selectedGender?.label || "Gender"}</span>
            <div
              onClick={toggleGenderDropdown}
              className="transition-transform mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`cursor-pointer 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3 max-[400px]:w-2 max-[400px]:h-2 transition-transform duration-300 ${isGenderOpen ? "rotate-180" : "rotate-0"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {isGenderOpen && (
              <ul className="z-10 absolute top-full mt-2 bg-white rounded-lg shadow-md w-full text-[#5F5B5B] font-poppins font-semibold">
                {genderOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectionGender(option)}
                    className="px-4 py-2 cursor-pointer rounded-lg hover:bg-[#7BCFD180] flex items-center space-x-3 max-[400px]:space-x-1"
                  >
                    <img
                      src={option.icon}
                      alt={option.label}
                      className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3 object-contain"
                    />
                    <span>{option.label}</span>
                  </li>
                ))}
              </ul>
            )}
            {/* Clear Button */}
            {selectedGender && (
              <button
                onClick={() => setSelectedGender("")}
                className="mt-2 text-red-500 2xl:text-[19px] xl:text-[17px] lg:text-[15px] md:text-[14px] sm:text-[11px] max-[430px]:text-[9px] hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div
            ref={ageDropdownRef}
            className="relative grid grid-cols-[0.5fr_1fr_0.5fr] mx-auto w-full justify-center items-start bg-[#E9E9E9] rounded-lg p-2 max-[430px]:p-1 text-center"
          >
            <img
              onClick={toggleAgeDropdown}
              src={age}
              alt="Age"
              className="cursor-pointer mx-auto 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3"
            />
            <span onClick={toggleAgeDropdown} className="cursor-pointer">{selectedAge.label || "Age"}</span>
            <div
              onClick={toggleAgeDropdown}
              className="transition-transform mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`cursor-pointer 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3 transition-transform duration-300 ${isAgeOpen ? "rotate-180" : "rotate-0"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {isAgeOpen && (
              <ul className="z-10 absolute top-full mt-2 bg-white rounded-lg shadow-md w-full h-[150px] overflow-y-auto text-[#5F5B5B] font-poppins font-semibold">
                {ageOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectionAge(option)}
                    className="px-4 max-[400px]:px-2 py-2 cursor-pointer rounded-lg hover:bg-[#7BCFD180] text-left"
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
            {/* Clear Button */}
            {selectedAge && (
              <button
                onClick={() => setSelectedAge("")}
                className="mt-2 text-red-500 2xl:text-[19px] xl:text-[17px] lg:text-[15px] md:text-[14px] sm:text-[11px] max-[430px]:text-[9px] hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="w-full max-[430px]:-mt-2 px-2 grid grid-cols-[1fr_1fr_2fr_2fr] gap-3 max-[430px]:gap-2 font-inter p-2 max-[430px]:p-1 max-[400px]:p-1 items-center max-[430px]:justify-center">
          {/*Image*/}
          <div className="relative">
            <input
              ref={fileInputRef} // Attach the ref to the input element
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="opacity-0 absolute cursor-pointer"
            />
            <div>
              {image ? (
                <>
                  <img
                    src={image}
                    alt="Uploaded"
                    className="2xl:h-14 2xl:w-14 xl:h-12 xl:w-12 lg:h-10 lg:w-10 md:h-10 md:w-10 sm:h-9 sm:w-9 max-[430px]:h-7 max-[430px]:w-7 rounded-full"
                  />
                  <button
                    className="text-start text-[#7bd0d1] hover:underline w-full 2xl:text-[17px] xl:text-[15px] lg:text-[13px] md:text-[12px] sm:text-[10px] max-[430px]:text-[8px]"
                    onClick={handleChangeImageClick} // Trigger the file input click
                  >
                    Change
                  </button>
                  <button
                    className="text-start text-red-600 hover:underline w-full 2xl:text-[17px] xl:text-[15px] lg:text-[13px] md:text-[12px] sm:text-[10px] max-[430px]:text-[8px]"
                    onClick={handleImageRemove}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <span className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-5 md:h-5 sm:w-4 sm:h-4 max-[430px]:w-4 max-[430px]:h-4 inline-block mr-2 text-[#424242]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z"
                      fill="#0F0F0F"
                    />
                    <path
                      d="M4.80665 17.5211L9.1221 9.60947C9.50112 8.91461 10.4989 8.91461 10.8779 9.60947L14.0465 15.4186L15.1318 13.5194C15.5157 12.8476 16.4843 12.8476 16.8682 13.5194L19.1451 17.5039C19.526 18.1705 19.0446 19 18.2768 19H5.68454C4.92548 19 4.44317 18.1875 4.80665 17.5211Z"
                      fill="#0F0F0F"
                    />
                    <path d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z" />
                  </svg>
                </span>
              )}
            </div>
          </div>

          {/*Location*/}
          <div className="relative flex items-center">
            {!location && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-5 md:h-5 sm:w-4 sm:h-4 max-[430px]:w-4 max-[430px]:h-4 inline-block text-[#424242] hover:text-[#7BCFD180] rounded cursor-pointer"
                fill="currentColor"
                // onClick={handleLocationClick}
                onClick={handleUseCurrentLocation}
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 4.93 7 13 7 13s7-8.07 7-13c0-3.87-3.13-7-7-7zm0 10.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
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
                  className="text-start text-red-600 hover:underline w-full 2xl:text-[17px] xl:text-[15px] lg:text-[13px] md:text-[12px] sm:text-[10px] max-[430px]:text-[8px]"
                  // onClick={handleChangeLocation}
                  onClick={handleChangeLocation}
                >
                  Remove
                </button>
              </div>
            )}
            {/* <LocationPicker onLocationSelect={handleLocationSelect} /> */}
          </div>
          <input
            type="text"
            value={search} // Set the value of the input to the state
            onChange={handleSearchChange}
            placeholder="Search..."
            className="text-[#4242425C] border rounded p-1 font-[400] bg-[#F5F5F5] m-1"
          />
          <div className="bg-pink-button border border-[rgba(95,91,91,0.3)] hover:bg-[#7BCFD180] text-white font-[700] w-1/2 inline-block rounded-lg p-2 max-[430px]:p-1 max-[430px]:w-full text-center shadow-md">
            <button
              className="flex justify-center items-center w-fit"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-5 md:h-5 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3 max-[400px]:w-2 max-[400px]:h-2 inline-block mr-2 max-[430px]:mr-0"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a8 8 0 105.293 14.707l4.853 4.853a1 1 0 101.414-1.414l-4.853-4.853A8 8 0 0010 2zm0 2a6 6 0 100 12 6 6 0 000-12z"
                  clip-rule="evenodd"
                />
              </svg>
              <h1 className="">Search</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
