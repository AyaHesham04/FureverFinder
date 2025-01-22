import React from 'react'
import background from "../../assets/HomePage/LandingBackground.png";
import circle from "../../assets/HomePage/circle.png";
import dogcat from "../../assets/HomePage/LandingMainDogCat.png";
import Menu from '../Menu';

const HomePageStart = () => {
  return (
    <>
      <div className="relative w-full 2xl:h-2/3 xl:h-2/3 lg:h-2/3 md:h-1/2">
        {/* Background Image */}
        <img src={background} className="w-full h-full" />

        {/* Menu */}
        <div className="z-10 absolute top-0 left-0 p-4">
          <Menu />
        </div>

        {/* Centered Circle */}
        <div className="absolute pt-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <img src={circle} alt="Circle" className="flex justify-center items-center 2xl:w-[450px] xl:w-[450px] lg:w-[350px] md:w-[250px] sm:w-[250px] max-[430px]:w-[150px] max-[400px]:w-[140px] max-[350px]:w-[120px]" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-3/4">
            <img src={dogcat} alt="dogcat" className="w-full" />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePageStart
