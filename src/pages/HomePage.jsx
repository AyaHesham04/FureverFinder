import React from 'react'
import HomePageStart from '../components/HomePage/HomePageStart';
import FilterBar from '../components/HomePage/FilterBar';
import Categories from '../components/HomePage/Categories';
import Card from "../components/Card";

import temp1 from "../assets/TemporaryImages/cat1.jpg";
import temp2 from "../assets/TemporaryImages/cat2.jpg";
import temp3 from "../assets/TemporaryImages/cat3.jpg";

import temp4 from "../assets/TemporaryImages/dog1.jpg";
import temp5 from "../assets/TemporaryImages/dog2.jpg";
import temp6 from "../assets/TemporaryImages/dog3.jpg";
import Footer from '../components/Footer';

const catData = [
  {
    name: "Ginger",
    gender: "Female",
    imageSrc: temp1,
  },
  {
    name: "Whiskers",
    gender: "Male",
    imageSrc: temp2,
  },
  {
    name: "Luna",
    gender: "Female",
    imageSrc: temp3,
  },
];

const dogData = [
  {
    name: "Toby",
    gender: "Male",
    imageSrc: temp4,
  },
  {
    name: "Ruby",
    gender: "Female",
    imageSrc: temp5,
  },
  {
    name: "Joy",
    gender: "Male",
    imageSrc: temp6,
  },
];

const HomePage = () => {
  return (
    <div className="w-full h-screen">
      <HomePageStart />
      <FilterBar />
      <Categories />
      <div className="flex items-center justify-center w-full">
        <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
        <span className="text-[#5F5B5B] font-poppins font-semibold text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] mx-4">Cats</span>
        <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
      </div>
      <div className="w-full flex justify-center items-center py-10">
        <div className="grid max-[430px]:grid-cols-2 sm:grid-cols-3 max-[430px]:gap-6 max-[400px]:gap-5 sm:gap-x-10 mx-auto justify-center items-center">
          {catData.map((cat, index) => (
            <Card key={index} {...cat} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
        <span className="text-[#5F5B5B] font-poppins font-semibold text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] mx-4">Dogs</span>
        <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
      </div>
      <div className="w-full flex justify-center items-center py-10">
        <div className="grid max-[430px]:grid-cols-2 sm:grid-cols-3 max-[430px]:gap-6 max-[400px]:gap-5 sm:gap-x-10 mx-auto justify-center items-center">
          {dogData.map((dog, index) => (
            <Card key={index} {...dog} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage;
