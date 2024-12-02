import { useState, useEffect } from "react";
import Card from "../components/Card";
import background from "../assets/PetDetailsPage/PetDetailsBack.png";

import temp1 from "../assets/TemporaryImages/cat1.jpg";
import temp2 from "../assets/TemporaryImages/cat2.jpg";
import temp3 from "../assets/TemporaryImages/cat3.jpg";
import BackButton from "../components/BackButton";

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

function ProfilePage({ userData }) {
  const [fullName, setFullName] = useState("");
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  useEffect(() => {
    console.log(userData);
    if (userData?.user?.fname && userData?.user?.lname) {
      setFullName(
        `${capitalize(userData.user.fname)} ${capitalize(userData.user.lname)}`
      );
    }
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
          <div className="w-full flex justify-center items-center py-10">
            <div className="grid max-[430px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:sm:grid-cols-3 max-[430px]:gap-6 max-[400px]:gap-5 sm:gap-x-10 mx-auto justify-center items-center">
              {catData.map((cat, index) => (
                <Card key={index} {...cat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
