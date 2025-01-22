import React, { useEffect, useState } from "react";
import HomePageStart from "../components/HomePage/HomePageStart";
import FilterBar from "../components/HomePage/FilterBar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import temp1 from "../assets/TemporaryImages/cat1.jpg";
import temp2 from "../assets/TemporaryImages/cat2.jpg";
import temp3 from "../assets/TemporaryImages/cat3.jpg";

const HomePage = () => {
  const [catData, setCatData] = useState([]);
  // const catData = [
  //   {
  //     id: "cat-1",
  //     name: "Whiskers",
  //     gender: "male",
  //     type: "cat",
  //     images: [temp1],
  //   },
  //   {
  //     id: "cat-2",
  //     name: "Mittens",
  //     gender: "female",
  //     type: "cat",
  //     images: [temp2],
  //   },
  //   {
  //     id: "cat-3",
  //     name: "Shadow",
  //     gender: "male",
  //     type: "cat",
  //     images: [temp3],
  //   },
  //   {
  //     id: "cat-4",
  //     name: "Luna",
  //     gender: "female",
  //     type: "cat",
  //     images: ["https://placekitten.com/300/300?image=4"],
  //   },
  //   {
  //     id: "cat-5",
  //     name: "Simba",
  //     gender: "male",
  //     type: "cat",
  //     images: ["https://placekitten.com/300/300?image=5"],
  //   },
  //   {
  //     id: "cat-6",
  //     name: "Ginger",
  //     gender: "female",
  //     type: "cat",
  //     images: ["https://placekitten.com/300/300?image=6"],
  //   },
  //   {
  //     id: "cat-7",
  //     name: "Oliver",
  //     gender: "male",
  //     type: "cat",
  //     images: ["https://placekitten.com/300/300?image=7"],
  //   },
  //   {
  //     id: "cat-8",
  //     name: "Cleo",
  //     gender: "female",
  //     type: "cat",
  //     images: ["https://placekitten.com/300/300?image=8"],
  //   },
  //   {
  //     id: "cat-9",
  //     name: "Leo",
  //     gender: "male",
  //     type: "cat",
  //     images: ["https://placekitten.com/300/300?image=9"],
  //   },
  //   {
  //     id: "cat-10",
  //     name: "Bella",
  //     gender: "female",
  //     type: "cat",
  //     images: ["https://placekitten.com/300/300?image=10"],
  //   },
  // ];

  const [dogData, setDogData] = useState([]);
  // const dogData = [
  //   {
  //     id: "dog-1",
  //     name: "Buddy",
  //     gender: "male",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=1"],
  //   },
  //   {
  //     id: "dog-2",
  //     name: "Charlie",
  //     gender: "male",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=2"],
  //   },
  //   {
  //     id: "dog-3",
  //     name: "Max",
  //     gender: "male",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=3"],
  //   },
  //   {
  //     id: "dog-4",
  //     name: "Bella",
  //     gender: "female",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=4"],
  //   },
  //   {
  //     id: "dog-5",
  //     name: "Daisy",
  //     gender: "female",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=5"],
  //   },
  //   {
  //     id: "dog-6",
  //     name: "Rocky",
  //     gender: "male",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=6"],
  //   },
  //   {
  //     id: "dog-7",
  //     name: "Lola",
  //     gender: "female",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=7"],
  //   },
  //   {
  //     id: "dog-8",
  //     name: "Zoe",
  //     gender: "female",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=8"],
  //   },
  //   {
  //     id: "dog-9",
  //     name: "Jack",
  //     gender: "male",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=9"],
  //   },
  //   {
  //     id: "dog-10",
  //     name: "Molly",
  //     gender: "female",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=10"],
  //   },
  // ];

  const [catPage, setCatPage] = useState(1);
  const [dogPage, setDogPage] = useState(1);
  const itemsPerPage = 6; // Display 6 animals per page

  const getPaginatedData = (data, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

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


  const [loading, setLoading] = useState(true);
  const handleLoading = (newLoadingState) => {
    setLoading(newLoadingState);
  };
  const handleCatDataUpdate = (newCatData) => {
    setCatData(newCatData);
  };

  const handleDogDataUpdate = (newDogData) => {
    console.log(newDogData);
    setDogData(newDogData);
  };

  return (
    <div className="w-full h-screen">
      <HomePageStart />
      <FilterBar
        onUpdateCatData={handleCatDataUpdate}
        onUpdateDogData={handleDogDataUpdate}
        onUpdateLoading={handleLoading}
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
            {getPaginatedData(catData, catPage).map((cat) => (
              <Card key={cat.id} id={cat.id} {...cat} />
            ))}
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4">
            {renderPageNumbers(catPage, totalPages(catData), setCatPage)}
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
            {getPaginatedData(dogData, dogPage).map((dog) => (
              <Card key={dog.id} id={dog.id} {...dog} />
            ))}
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4">
            {renderPageNumbers(dogPage, totalPages(dogData), setDogPage)}
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
