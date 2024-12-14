import male from "../assets/HomePage/Male.png";
import female from "../assets/HomePage/Female.png";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Card(pet) {
  // Add `id` to props
  const navigate = useNavigate();
  // console.log(pet);
  const handleCardClick = () => {
    navigate(`/pet/${pet.id}`, {
      // Use the `id` prop here
      state: { pet }, // Pass data to the details page
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="max-[430px]:w-[120px] max-[560px]:h-[200px] w-[190px] h-[270px] md:w-[190px] md:h-[260px] 2xl:w-[280px] 2xl:h-[400px] bg-pink-button p-2 rounded-[30px] shadow-lg hover:cursor-pointer"
    >
      <div className="max-[430px]:w-[100px] max-[430px]:h-[120px] w-[175px] h-[190px] md:w-[160px] md:h-[180px] 2xl:w-[250px] 2xl:h-[270px] mx-auto">
        <img
          src={pet.images[0].url}
          alt={pet.name}
          className="w-full h-full object-cover rounded-[20px]"
        />
      </div>

      <div className="flex justify-between items-center mt-4 2xl:mt-5">
        <h2 className="text-[20px] max-[430px]:text-[16px] lg:text-[24px] xl:text-[24px] 2xl:text-[30px] font-poppins font-semibold leading-[36px] tracking-[1%] text-[#5F5B5B]">
          {pet.name}
        </h2>
        <div className="flex items-center">
          <div className="rounded-full bg-white max-[400px]:w-[25px] max-[430px]:w-[30px] w-[40px] md:w-[50px] 2xl:w-[80px]">
            {pet.gender === "male" ? (
              <img src={male} alt="Male icon" />
            ) : (
              <img src={female} alt="Female icon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
