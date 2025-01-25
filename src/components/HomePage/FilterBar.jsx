import React, { useState, useEffect, useRef } from "react";
import pet from "../../assets/HomePage/dogBlack.png";
import gender from "../../assets/HomePage/gender.png";
import age from "../../assets/HomePage/age.png";
import axios from "axios";

import dog from "../../assets/HomePage/dogGrey.png";
import cat from "../../assets/HomePage/cat.png";
import femaleDark from "../../assets/HomePage/femaleDark.png";
import maleDark from "../../assets/HomePage/maleDark.png";
import { toast } from "react-toastify";

const FilterBar = ({ onUpdateCatData, onUpdateDogData, onUpdateLoading, catPage, dogPage }) => {
  const [selectedPet, setSelectedPet] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [search, setSearch] = useState("");

  const fetchPets = async () => {
    try {
      const response = await axios.get(`https://api-fureverfinders.amrnabih.com/api/pets/index?paginate=6`);
      const data = response.data; // Axios automatically parses JSON response
      // Map the data and send it directly to parent
      const formattedCatData = data.cats.data.map((cat) => ({
        id: cat.id,
        name: cat.pet_name,
        gender: cat.gender,
        images: cat.images,
        year: cat.year,
        month: cat.month,
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
      const resultCat = {
        cats: formattedCatData,
        last_page: data.cats.last_page, // Add last_page to the result
      };

      const formattedDogData = data.dogs.data.map((dog) => ({
        id: dog.id,
        name: dog.pet_name,
        gender: dog.gender,
        images: dog.images,
        year: dog.year,
        month: dog.month,
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

      const resultDog = {
        dogs: formattedDogData,
        last_page: data.dogs.last_page, // Add last_page to the result
      };
      // Pass data to parent handlers
      onUpdateCatData(resultCat);
      onUpdateDogData(resultDog);
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
  useEffect(() => {
    handleSearch();
  }, [catPage, dogPage]);
  const handleSearch = async () => {
    onUpdateLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedPet !== "") {
        params.append("pet_type", selectedPet.value);
      }
      if (search !== "") {
        params.append("search", search);
      }

      if (selectedGender !== "") {
        params.append("gender", selectedGender.value);
      }

      params.append("cat_page", catPage);
      params.append("dog_page", dogPage);
      params.append("paginate", 6);
      if (selectedAge !== "") {
        console.log("label:", selectedAge.label);

        if (selectedAge.label.includes("mo")) {
          params.append("min_age_month", selectedAge.value);
        } else if (selectedAge.label.includes("yr")) {
          params.append("min_age_year", selectedAge.value);
        }
      }

      // Prepare the FormData
      const formData = new FormData();

      const queryString = params.toString(); // Convert params to query string
      const apiUrl = `https://api-fureverfinders.amrnabih.com/api/pets/index?${queryString}`;

      // Make the POST request with FormData
      const response = await axios.get(
        apiUrl,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the correct content type is set for file uploads
          },
        }

      );

      // Directly access response.data
      const data = response.data;

      const formattedCatData = data.cats.data.map((cat) => ({
        id: cat.id,
        name: cat.pet_name,
        gender: cat.gender,
        images: cat.images,
        year: cat.year,
        month: cat.month,
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
      const resultCat = {
        cats: formattedCatData,
        last_page: data.cats.last_page, // Add last_page to the result
      };

      const formattedDogData = data.dogs.data.map((dog) => ({
        id: dog.id,
        name: dog.pet_name,
        gender: dog.gender,
        images: dog.images,
        year: dog.year,
        month: dog.month,
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

      const resultDog = {
        dogs: formattedDogData,
        last_page: data.dogs.last_page, // Add last_page to the result
      };
      // Pass data to parent handlers
      onUpdateCatData(resultCat);
      onUpdateDogData(resultDog);
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
            <span onClick={togglePetDropdown} className="cursor-pointer">{selectedPet?.label || "Type"}</span>
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
        <div className="w-full max-[430px]:-mt-2 px-2 grid grid-cols-[2.5fr_1fr] gap-3 max-[430px]:gap-2 font-inter p-2 max-[430px]:p-1 max-[400px]:p-1 items-center justify-center">
          <input
            type="text"
            value={search} // Set the value of the input to the state
            onChange={handleSearchChange}
            placeholder="Search..."
            className="text-[#4242425C] border rounded p-2 font-[400] bg-[#F5F5F5] m-1"
          />
          <div className="bg-pink-button border border-[rgba(95,91,91,0.3)] hover:bg-[#7BCFD180] text-white font-[700] w-3/4 inline-block rounded-lg p-2 max-[430px]:p-1 max-[430px]:w-full text-center shadow-md">
            <button
              className="flex justify-center items-center w-full"
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
