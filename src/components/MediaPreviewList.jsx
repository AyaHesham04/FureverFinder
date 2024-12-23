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
      <div className="overflow-hidden rounded-lg shadow-lg 2xl:w-96 2xl:h-72 xl:w-80 xl:h-60 lg:w-72 lg:h-52 md:w-64 md:h-48 sm:w-60 sm:h-44 max-[430px]:w-36 max-[430px]:h-32 max-[400px]:w-32 max-[400px]:h-28">
        {
          // mediaList[currentIndex].type === "image" && (
          <img
            src={mediaList[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-full"
          />
          // )
        }
        {/* {mediaList[currentIndex].type === "video" && (
          <video
            src={mediaList[currentIndex].url}
            controls
            className="w-full h-full"
          ></video>
        )} */}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
      >
        &larr;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
      >
        &rarr;
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4">
        {mediaList.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === currentIndex
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
