import male from "../assets/HomePage/Male.png";
import female from "../assets/HomePage/Female.png";

// eslint-disable-next-line react/prop-types
export default function Card({ name, gender, imageSrc }) {
  return (
    <div className="w-[190px] h-[270px] md:w-[200px] md:h-[300px]  2xl:w-[376px] 2xl:h-[488px] bg-pink-light p-2 rounded-[30px] shadow-md">
      <div className="w-[175px] h-[190px] md:w-[187px] md:h-[207px] 2xl:w-[357px] 2xl:h-[347px]">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover rounded-[20px]"
        />
      </div>

      <div className="flex justify-between items-center mx-4 mt-4 2xl:mt-5">
        <h2 className="text-[25px] md:text-[25px] 2xl:text-[55px]  font-Poppins font-bold leading-[36px] tracking-[1%]  text-[#5F5B5B]">
          {name}
        </h2>
        <div className="flex items-center ">
          <div className="rounded-full bg-white w-[40px] md:w-[50px] 2xl:w-[80px]">
            {gender == "Male" ? (
              <img src={male}></img>
            ) : (
              <img src={female}></img>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
