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

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(
          "https://api-fureverfinders.amrnabih.com/api/pets/index"
        );
        const data = await response.json();

        // Map the data to match the structure used in the `Card` component
        setCatData(
          data.cats
            .map((cat) => ({
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
            }))
            .slice(0, 3)
        );

        setDogData(
          data.dogs
            .map((dog) => ({
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
            }))
            .slice(0, 3)
        );
      } catch (error) {
        console.error("Error fetching pets data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <HomePageStart />
      <FilterBar />
      <Categories />

      {/* Cats Section */}
      <div className="flex items-center justify-center w-full">
        <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
        <span className="text-[#5F5B5B] font-poppins font-semibold text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] mx-4">
          Cats
        </span>
        <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
      </div>
      <div className="w-full flex justify-center items-center py-10">
        <div className="grid max-[430px]:grid-cols-2 sm:grid-cols-3 max-[430px]:gap-6 max-[400px]:gap-5 sm:gap-x-10 mx-auto justify-center items-center">
          {catData.map((cat, index) => (
            <Card key={index} id={cat.id} {...cat} />
          ))}
        </div>
      </div>

      {/* Dogs Section */}
      <div className="flex items-center justify-center w-full">
        <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
        <span className="text-[#5F5B5B] font-poppins font-semibold text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] mx-4">
          Dogs
        </span>
        <div className="flex-grow border-b-4 border-[#5F5B5BB2]"></div>
      </div>
      <div className="w-full flex justify-center items-center py-10">
        <div className="grid max-[430px]:grid-cols-2 sm:grid-cols-3 max-[430px]:gap-6 max-[400px]:gap-5 sm:gap-x-10 mx-auto justify-center items-center">
          {dogData.map((dog, index) => (
            <Card key={index} id={dog.id} {...dog} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
