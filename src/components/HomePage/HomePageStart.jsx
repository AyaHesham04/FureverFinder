import React from 'react';
import background from "../../assets/HomePage/LandingBackground.png";
import circle from "../../assets/HomePage/circle.png";
import dogcat from "../../assets/HomePage/LandingMainDogCat.png";
import Menu from '../Menu';

const HomePageStart = () => {
  return (
    <>
      <div className="relative w-full h-[65vh] sm:h-[80vh] md:h-2/3 lg:h-2/3 xl:h-2/3 2xl:h-2/3">
        {/* Background Image */}
        <img src={background} className="w-full h-full object-cover" alt="Background" />

        {/* Menu */}
        <div className="z-10 absolute top-0 left-0 p-4">
          <Menu />
        </div>

        {/* Centered Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <img
            src={circle}
            alt="Circle"
            className="w-[80vw] sm:w-[450px] md:w-[350px] lg:w-[450px] xl:w-[450px] 2xl:w-[450px]"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-3/4">
            <img
              src={dogcat}
              alt="dogcat"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageStart;