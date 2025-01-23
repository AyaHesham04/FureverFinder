import React, { useState } from "react";

const MediaSlider = ({ mediaList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaList.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg 2xl:w-96 2xl:h-72 xl:w-80 xl:h-60 lg:w-72 lg:h-52 md:w-64 md:h-48 sm:w-56 sm:h-44 max-[560px]:w-36 max-[560px]:h-32 max-[430px]:w-36 max-[430px]:h-32 max-[400px]:w-32 max-[400px]:h-28">
        {
          <img
            src={mediaList[currentIndex].url}
            alt={`Slide ${currentIndex}`}
            className="w-full h-full"
          />
        }
      </div>

      {/* Navigation Controls */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 sm:-left-7 -left-5 transform -translate-y-1/2 py-1 px-1 rounded hover:text-white disabled:text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="2xl:w-7 2xl:h-7 xl:w-6 xl:h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[560px]:w-5 max-[560px]:h-5 max-[430px]:w-5 max-[430px]:h-5 max-[400px]:w-4 max-[400px]:h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 sm:-right-7 -right-5 transform -translate-y-1/2 py-1 px-1 rounded hover:text-white disabled:text-gray-40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="2xl:w-7 2xl:h-7 xl:w-6 xl:h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-5 sm:h-5 ax-[560px]:w-5 max-[560px]:h-5 max-[430px]:w-5 max-[430px]:h-5 max-[400px]:w-4 max-[400px]:h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4">
        {mediaList.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${index === currentIndex
              ? "bg-pink-light"
              : "bg-gray-300 hover:bg-gray-400"
              }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default MediaSlider;
