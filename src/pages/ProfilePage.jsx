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
        images: cat.images,
        year: cat.year,
        month: cat.month,
        weight: cat.weight,
        description: cat.description,
        address: cat.address,
        user_id: cat.user_id,
        created_at: cat.created_at,
        status: cat.status,
        user: {
          email: userData.user.email,
          fname: userData.user.fname,
          lname: userData.user.lname,
          phone: userData.user.phone,
        },
      }))
    );
    setDogData(
      userData.dogs.map((dog) => ({
        id: dog.id,
        name: dog.pet_name,
        gender: dog.gender,
        images: dog.images,
        year: dog.year,
        month: dog.month,
        weight: dog.weight,
        description: dog.description,
        address: dog.address,
        user_id: dog.user_id,
        created_at: dog.created_at,
        status: dog.status,
        user: {
          email: userData.user.email,
          fname: userData.user.fname,
          lname: userData.user.lname,
          phone: userData.user.phone,
        },
      }))
    );
  }, [userData]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <BackButton></BackButton>
      <img src={background} alt="Background" className="w-full h-full" />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="h-[95%] absolute top-0 flex flex-col justify-center items-center sm:px-7 px-3 my-4">
          {/* Dynamically Display Full Name */}
          <h1 className="text-[#5F5B5B] p-4 font-poppins font-[500] text-[28px] max-[400px]:text-[20px] max-[430px]:text-[20px] sm:text-[24px] md:text-[24px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px]">
            {fullName || "Loading..."}
          </h1>
          <div className="w-full flex justify-center py-6 overflow-y-auto scrollbar-hide">
            <div className="grid max-[430px]:grid-cols-2 grid-cols-2 gap-2 sm:grid-cols-3 max-[430px]:gap-4 max-[400px]:gap-2 sm:gap-x-4 mx-auto justify-center items-center">
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
