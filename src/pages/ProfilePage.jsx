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
  // const dogData = [
  //   {
  //     id: "dog-1",
  //     name: "Buddy",
  //     gender: "male",
  //     type: "dog",
  //     images: [temp1],
  //   },
  //   {
  //     id: "dog-2",
  //     name: "Charlie",
  //     gender: "male",
  //     type: "dog",
  //     images: [temp2],
  //   },
  //   {
  //     id: "dog-3",
  //     name: "Max",
  //     gender: "male",
  //     type: "dog",
  //     images: [temp3],
  //   },
  //   {
  //     id: "dog-4",
  //     name: "Bella",
  //     gender: "female",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=4"],
  //   },
  //   {
  //     id: "dog-5",
  //     name: "Daisy",
  //     gender: "female",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=5"],
  //   },
  //   {
  //     id: "dog-6",
  //     name: "Rocky",
  //     gender: "male",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=6"],
  //   },
  //   {
  //     id: "dog-7",
  //     name: "Lola",
  //     gender: "female",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=7"],
  //   },
  //   {
  //     id: "dog-8",
  //     name: "Zoe",
  //     gender: "female",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=8"],
  //   },
  //   {
  //     id: "dog-9",
  //     name: "Jack",
  //     gender: "male",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=9"],
  //   },
  //   {
  //     id: "dog-10",
  //     name: "Molly",
  //     gender: "female",
  //     type: "dog",
  //     images: ["https://placedog.net/300/300?id=10"],
  //   },
  // ];
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
