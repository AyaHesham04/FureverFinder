import React, { useEffect, useState } from "react";
import HomePageStart from "../components/HomePage/HomePageStart";
import FilterBar from "../components/HomePage/FilterBar";
import Categories from "../components/HomePage/Categories";
import Card from "../components/Card";
import Footer from "../components/Footer";

const HomePage = () => {
  const [catData, setCatData] = useState([]);
  const [dogData, setDogData] = useState([]);
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

  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategories, setShowCategories] = useState(true);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };


  const handleFilterStateChange = (filtersEmpty) => {
    setShowCategories(filtersEmpty);
  };

  return (
    <div className="w-full h-screen">
      <HomePageStart />
      <FilterBar
        onUpdateCatData={handleCatDataUpdate}
        onUpdateDogData={handleDogDataUpdate}
        onUpdateLoading={handleLoading}
        onFilterStateChange={handleFilterStateChange}
      />
      {showCategories && (
        <Categories onCategorySelect={handleCategorySelect} />
      )}

      {/* Cats Section */}
      {(selectedCategory === "cats" || selectedCategory === "") && (
        <>
          <div className="flex items-center justify-center w-full">
            <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
            <span className="text-[#5F5B5B] font-poppins font-semibold text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] mx-4">
              Cats
            </span>
            <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
          </div>
          {!loading ? (
            <div className="w-full flex justify-center items-center py-10">
              <div className="grid max-[430px]:grid-cols-2 sm:grid-cols-3 max-[430px]:gap-6 max-[400px]:gap-5 sm:gap-x-10 mx-auto justify-center items-center">
                {selectedCategory === "cats"
                  ? catData?.map((cat, index) => (
                    <Card key={index} id={cat.id} {...cat} />
                  ))
                  : catData?.map((cat, index) => (
                    <Card key={index} id={cat.id} {...cat} />
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-screen flex items-center justify-center">
              Loading...
            </div>
          )}
        </>
      )}

      {/* Dogs Section */}
      {(selectedCategory === "dogs" || selectedCategory === "") && (
        <>
          <div className="flex items-center justify-center w-full">
            <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
            <span className="text-[#5F5B5B] font-poppins font-semibold text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] mx-4">
              Dogs
            </span>
            <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
          </div>
          {!loading ? (
            <div className="w-full flex justify-center items-center py-10">
              <div className="grid max-[430px]:grid-cols-2 sm:grid-cols-3 max-[430px]:gap-6 max-[400px]:gap-5 sm:gap-x-10 mx-auto justify-center items-center">
                {selectedCategory === "dogs"
                  ? dogData?.map((dog, index) => (
                    <Card key={index} id={dog.id} {...dog} />
                  ))
                  : dogData?.map((dog, index) => (
                    <Card key={index} id={dog.id} {...dog} />
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-screen flex items-center justify-center">
              Loading...
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
