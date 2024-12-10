import React, { useState, useEffect, useRef } from "react";
import pet from "../../assets/HomePage/dogBlack.png";
import gender from "../../assets/HomePage/gender.png";
import age from "../../assets/HomePage/age.png";

import dog from "../../assets/HomePage/dogGrey.png";
import cat from "../../assets/HomePage/cat.png";
import femaleDark from "../../assets/HomePage/femaleDark.png";
import maleDark from "../../assets/HomePage/maleDark.png";

const FilterBar = ({ onUpdateCatData, onUpdateDogData, onUpdateLoading }) => {
  const fetchPets = async () => {
    try {
      const response = await fetch(
        "https://api-fureverfinders.amrnabih.com/api/pets/index"
      );
      const data = await response.json();

      // Map the data and send it directly to parent
      const formattedCatData = data.cats.map((cat) => ({
        id: cat.id,
        name: cat.pet_name,
        gender: cat.gender,
        images: cat.images,
        year: cat.year,
        month: cat.month,
        address: cat.address,
        weight: cat.weight,
        description: cat.description,
        user_id: cat.user_id,
        created_at: cat.created_at,
        status: cat.status,
      }));
      const formattedDogData = data.dogs.map((dog) => ({
        id: dog.id,
        name: dog.pet_name,
        gender: dog.gender,
        images: dog.images,
        year: dog.year,
        month: dog.month,
        address: dog.address,
        weight: dog.weight,
        description: dog.description,
        user_id: dog.user_id,
        created_at: dog.created_at,
        status: dog.status,
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
      label: `${i} ${i === 1 ? "month" : "months"}`,
    });
  }

  // Generate options for years (1 year to 20 years)
  for (let i = 1; i <= 20; i++) {
    ageOptions.push({
      value: `${i * 12}`,
      label: `${i} ${i === 1 ? "year" : "years"}`,
    });
  }

  const dropdownRef = useRef(null); // Ref to track the dropdown menu element

  const [isPetOpen, setIsPetOpen] = useState(false);
  const togglePetDropdown = () => setIsPetOpen(!isPetOpen);

  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const toggleGenderDropdown = () => setIsGenderOpen(!isGenderOpen);

  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const toggleAgeDropdown = () => setIsAgeOpen(!isAgeOpen);

  const toggleDropDowns = () => {
    setIsPetOpen(!isPetOpen);
    setIsGenderOpen(!isGenderOpen);
    setIsAgeOpen(!isAgeOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPetOpen(false);
        setIsGenderOpen(false);
        setIsAgeOpen(false);
      }
    };

    // Add event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mx-5 sm:mx-8 mt-4">
      <div className="bg-[#F5F5F5] w-full grid sm:grid-cols-[2fr_1fr] grid-cols-[3fr_0.5fr] max-[400px]:grid-cols-[4fr_0.1fr] lg:gap-x-10 gap-x-2 items-center justify-center rounded-lg 2xl:text-[19px] xl:text-[17px] lg:text-[15px] md:text-[14px] sm:text-[11px] max-[430px]:text-[9px]">
        <div className="w-full font-inter font-[700] grid grid-cols-3 gap-3 max-[430px]:gap-1 p-3 max-[430px]:p-1 text-black">
          <div
            ref={dropdownRef}
            className="relative grid grid-cols-[0.5fr_1fr_0.5fr] mx-auto w-full justify-center items-center bg-[#E9E9E9] rounded-lg p-3  max-[430px]:p-1 text-center"
          >
            <img
              src={pet}
              alt="Pet"
              className="mx-auto 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3"
            />
            <div className="mx-auto">Pet</div>
            <div
              onClick={togglePetDropdown}
              className="transition-transform mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3 transition-transform duration-300 ${
                  isPetOpen ? "rotate-180" : "rotate-0"
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
              <ul className="absolute top-full mt-2 bg-white rounded-lg shadow-md w-full text-[#5F5B5B] font-poppins font-semibold">
                {petOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => setIsPetOpen(false)}
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
          </div>
          <div
            ref={dropdownRef}
            className="relative grid grid-cols-[0.5fr_1fr_0.5fr] mx-auto w-full justify-center items-center bg-[#E9E9E9] rounded-lg p-3  max-[430px]:p-1 text-center"
          >
            <img
              src={gender}
              alt="Gender"
              className="mx-auto 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3"
            />
            <div className="mx-auto">Gender</div>
            <div
              onClick={toggleGenderDropdown}
              className="transition-transform mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3 max-[400px]:w-2 max-[400px]:h-2 transition-transform duration-300 ${
                  isGenderOpen ? "rotate-180" : "rotate-0"
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
              <ul className="absolute top-full mt-2 bg-white rounded-lg shadow-md w-full text-[#5F5B5B] font-poppins font-semibold">
                {genderOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => setIsGenderOpen(false)}
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
          </div>
          <div
            ref={dropdownRef}
            className="relative grid grid-cols-[0.5fr_1fr_0.5fr] mx-auto w-full justify-center items-center bg-[#E9E9E9] rounded-lg p-3  max-[430px]:p-1 text-center"
          >
            <img
              src={age}
              alt="Age"
              className="mx-auto 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3"
            />
            <div className="mx-auto">Age</div>
            <div
              onClick={toggleAgeDropdown}
              className="transition-transform mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3 transition-transform duration-300 ${
                  isAgeOpen ? "rotate-180" : "rotate-0"
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
              <ul className="absolute top-full mt-2 bg-white rounded-lg shadow-md w-full h-[150px] overflow-y-auto text-[#5F5B5B] font-poppins font-semibold">
                {ageOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => setIsAgeOpen(false)}
                    className=" px-4 max-[400px]:px-2 py-2 cursor-pointer rounded-lg hover:bg-[#7BCFD180] text-left"
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="w-full grid grid-cols-[1.5fr_1fr] sm:grid-cols-[1fr_1fr] max-[430px]:grid-col-1 font-inter p-3 max-[430px]:p-2 max-[400px]:p-1 items-center max-[430px]:justify-center">
          <input
            type="text"
            placeholder="Search pets..."
            className="text-[#4242425C] font-[400] block max-[430px]:hidden bg-[#F5F5F5]"
          />
          <div className="bg-pink-button border border-[rgba(95,91,91,0.3)] hover:bg-[#7BCFD180] text-white font-[700] w-full inline-block rounded-lg p-2 max-[430px]:p-1 max-[430px]:w-fit text-center shadow-md">
            <button className="flex justify-center items-center w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-5 md:h-5 sm:w-4 sm:h-4 max-[430px]:w-3 max-[430px]:h-3 inline-block mr-2 max-[430px]:mr-0"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a8 8 0 105.293 14.707l4.853 4.853a1 1 0 101.414-1.414l-4.853-4.853A8 8 0 0010 2zm0 2a6 6 0 100 12 6 6 0 000-12z"
                  clip-rule="evenodd"
                />
              </svg>
              <h1 className="grid max-[430px]:hidden">Search</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
