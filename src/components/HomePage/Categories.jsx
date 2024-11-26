import dog from "../../assets/HomePage/LandingPageDog.png";
import cat from "../../assets/HomePage/LandingPageCat.png";

const Categories = () => {
  return (
    <div className="mx-auto w-full py-5 mb-10 grid grid-cols-1 justify-center items-center">
      <h1 className="text-[#5F5B5B] font-poppins font-semibold text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] my-9 ml-24">
        Categories
      </h1>
      <div className="flex  space-x-[50px] md:space-x-[50px] lg:space-x-[100px] xl:space-x-[300px] justify-center items-center w-full  h-full text-[#5F5B5B] text-[20px] max-[430px]:text-[16px] lg:text-[24px] xl:text-[24px] 2xl:text-[30px]">
        <div className="bg-pink-button space-x-2 md:space-x-0 w-[150px] h-[80px] md:w-[200px] md:h-[300px] lg:w-[300px] lg:h-[400px] flex flex-row md:flex-col justify-center items-center rounded-3xl md:rounded-lg  shadow-lg">
          <div className="h-[50px] md:h-[200px] lg:h-[300px]">
            <img src={cat} className="h-full md:pb-10" />
          </div>
          <div className="">
            <button className=" px-1 py-2   md:border md:border-[rgba(95,91,91,0.3)]  md:bg-[#7BCFD180] md:px-5 md:py-2 rounded-lg font-poppins font-semibold hover:rounded-full">
              Cats
            </button>
          </div>
        </div>
        <div className="bg-pink-button space-x-2 md:space-x-0 flex flex-row md:flex-col  w-[150px] h-[80px] md:w-[200px] md:h-[300px] lg:w-[300px] lg:h-[400px] justify-center items-center rounded-3xl md:rounded-lg shadow-lg">
          <div className="h-[50px] md:h-[200px] lg:h-[300px]">
            <img src={dog} className="h-full  md:pb-10" />
          </div>
          <div className="">
            <button className=" px-1 py-2 md:border md:border-[rgba(95,91,91,0.3)]  md:bg-[#7BCFD180] md:px-5 md:py-2  rounded-lg font-poppins font-semibold hover:rounded-full">
              Dogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
