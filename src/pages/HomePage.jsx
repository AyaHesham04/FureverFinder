import React, { useEffect, useState } from "react";
import HomePageStart from "../components/HomePage/HomePageStart";
import FilterBar from "../components/HomePage/FilterBar";
import Card from "../components/Card";
import Footer from "../components/Footer";

const HomePage = () => {
  const [catData, setCatData] = useState([]);
  const [dogData, setDogData] = useState([]);
  const [catPage, setCatPage] = useState(1);
  const [dogPage, setDogPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6; // Display 6 animals per page

  const getPaginatedData = (data, page) => {
    return data;
  };

  const renderPageNumbers = (currentPage, total, setPage) => {
    return (
      <div className="flex space-x-2 my-4 items-center justify-center text-[17px] max-[430px]:text-[14px] sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-poppins font-semibold">
        {/* Previous Arrow Icon */}
        <button
          onClick={() => setPage(Math.max(1, currentPage - 1))}
          className="py-1 px-1 rounded hover:bg-pink-button disabled:text-gray-400 disabled:hover:bg-white"
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="2xl:w-7 2xl:h-7 xl:w-6 xl:h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[430px]:w-5 max-[430px]:h-5 max-[400px]:w-4 max-[400px]:h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Numbers */}
        {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`py-1 px-3 rounded hover:underline ${page === currentPage
              ? "text-pink-light"
              : "text-[#5F5B5B]"
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next Arrow Icon */}
        <button
          onClick={() => setPage(Math.min(total, currentPage + 1))}
          className="py-1 px-1 rounded hover:bg-pink-button disabled:text-gray-400 disabled:hover:bg-white"
          disabled={currentPage === total}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="2xl:w-7 2xl:h-7 xl:w-6 xl:h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[430px]:w-5 max-[430px]:h-5 max-[400px]:w-4 max-[400px]:h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  const handleLoading = (newLoadingState) => {
    setLoading(newLoadingState);
  };

  const handleCatDataUpdate = (newCatData) => {
    setCatData(newCatData);
  };

  const handleDogDataUpdate = (newDogData) => {
    setDogData(newDogData);
  };

  return (
    <div className="w-full h-screen">
      <HomePageStart />
      {
        console.log(catData)

      }
      <FilterBar
        onUpdateCatData={handleCatDataUpdate}
        onUpdateDogData={handleDogDataUpdate}
        onUpdateLoading={handleLoading}
        catPage={catPage}
        dogPage={dogPage}
      />

      {/* Cats Section */}
      <div className="flex items-center justify-center w-full py-2">
        <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
        <span className="text-[#5F5B5B] font-poppins font-semibold text-[28px] max-[430px]:text-[16px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] mx-4">
          Cats
        </span>
        <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
      </div>
      {!loading ? (
        <div className="w-full grid grid-cols-1 justify-center items-center">
          <div className="grid max-[400px]:grid-cols-1 grid-cols-2 gap-4 sm:grid-cols-3 max-[430px]:gap-4 max-[400px]:gap-3 sm:gap-x-10 mx-auto justify-center items-center">
            {getPaginatedData(catData.cats, catPage).map((cat) => (
              <Card key={cat.id} id={cat.id} {...cat} />
            ))}
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4">
            {renderPageNumbers(catPage, catData.last_page, setCatPage)}
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          Loading...
        </div>
      )}

      {/* Dogs Section */}
      <div className="flex items-center justify-center w-full py-2">
        <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
        <span className="text-[#5F5B5B] font-poppins font-semibold text-[28px] max-[430px]:text-[16px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] mx-4">
          Dogs
        </span>
        <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
      </div>
      {!loading ? (
        <div className="w-full grid grid-cols-1 justify-center items-center">
          <div className="grid max-[430px]:grid-cols-2 grid-cols-2 gap-4 sm:grid-cols-3 max-[430px]:gap-4 max-[400px]:gap-5 sm:gap-x-10 mx-auto justify-center items-center">
            {getPaginatedData(dogData.dogs, dogPage).map((dog) => (
              <Card key={dog.id} id={dog.id} {...dog} />
            ))}
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4">
            {renderPageNumbers(dogPage, dogData.last_page, setDogPage)}
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          Loading...
        </div>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;