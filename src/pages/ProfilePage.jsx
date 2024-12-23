import { useState, useEffect } from "react";
import Card from "../components/Card";
import background from "../assets/PetDetailsPage/PetDetailsBack.png";

import temp1 from "../assets/TemporaryImages/cat1.jpg";
import temp2 from "../assets/TemporaryImages/cat2.jpg";
import temp3 from "../assets/TemporaryImages/cat3.jpg";
import BackButton from "../components/BackButton";

function ProfilePage({ userData }) {
  const [fullName, setFullName] = useState("");
  const [catData, setCatData] = useState([]);
  const [dogData, setDogData] = useState([]);
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  useEffect(() => {
    if (userData?.user?.fname && userData?.user?.lname) {
      setFullName(
        `${capitalize(userData.user.fname)} ${capitalize(userData.user.lname)}`
      );
    }
    setCatData(
      userData.cats.map((cat) => ({
        id: cat.id,
        name: cat.pet_name,
        gender: cat.gender,
        images: cat.images.map((image) => `data:image/jpeg;base64,${image}`),
        year: cat.year,
        month: cat.month,
        longitude: cat.address.coordinates[0],
        latitude: cat.address.coordinates[1],
        weight: cat.weight,
        description: cat.description,
        user_id: cat.user_id,
        created_at: cat.created_at,
        status: cat.status,
        user: {
          email: userData.email,
          fname: userData.fname,
          lname: userData.lname,
          phone: userData.phone,
        },
      }))
    );
    setDogData(
      userData.dogs.map((dog) => ({
        id: dog.id,
        name: dog.pet_name,
        gender: dog.gender,
        images: dog.images.map((image) => `data:image/jpeg;base64,${image}`),
        year: dog.year,
        month: dog.month,
        longitude: dog.address.coordinates[0],
        latitude: dog.address.coordinates[1],
        weight: dog.weight,
        description: dog.description,
        user_id: dog.user_id,
        created_at: dog.created_at,
        status: dog.status,
        user: {
          email: userData.email,
          fname: userData.fname,
          lname: userData.lname,
          phone: userData.phone,
        },
      }))
    );
  }, [userData]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <BackButton></BackButton>
      <img src={background} alt="Background" className="w-full h-full" />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="bg-[#FFE5E666] h-[95%] absolute top-0 flex flex-col justify-center items-center px-12 my-4 rounded-lg shadow-md">
          {/* Dynamically Display Full Name */}
          <h1 className="text-[#5F5B5B] font-poppins font-[500] text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px]">
            {fullName || "Loading..."}
          </h1>
          <div className="w-full flex justify-center py-10 overflow-y-auto scrollbar-hide">
            <div className="grid max-[430px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:sm:grid-cols-3 max-[430px]:gap-6 max-[400px]:gap-5 sm:gap-x-10 mx-auto justify-center items-center">
              {catData.map((cat, index) => (
                <Card key={index} {...cat} canDelete={true} type="cat" />
              ))}
              {dogData.map((cat, index) => (
                <Card key={index} {...cat} canDelete={true} type="dog" />
              ))}
            </div>
          </div>
          <div className="py-5"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
