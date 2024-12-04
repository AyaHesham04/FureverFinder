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
            <div className="overflow-hidden rounded-lg shadow-lg">
                {mediaList[currentIndex].type === "image" && (
                    <img
                        src={mediaList[currentIndex].url}
                        alt={`Slide ${currentIndex}`}
                        className="w-full h-auto"
                    />
                )}
                {mediaList[currentIndex].type === "video" && (
                    <video
                        src={mediaList[currentIndex].url}
                        controls
                        className="w-full h-auto"
                    ></video>
                )}
            </div>

            {/* Navigation Controls */}
            <button
                onClick={goToPrev}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
                &larr;
            </button>
            <button
                onClick={goToNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
                &rarr;
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4">
                {mediaList.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex
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
