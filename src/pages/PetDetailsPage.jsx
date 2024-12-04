import background from "../assets/PetDetailsPage/PetDetailsBack.png";
import temp1 from "../assets/TemporaryImages/cat1.jpg";

const PetDetails = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img src={background} className="w-full h-full" />
      <div className="absolute flex flex-col justify-center items-center top-4 left-1/4">
        <img src={temp1} className="xl:w-[676px] xl:h-[321px] 2xl:h-[521px] 2xl:w-[876px] rounded-xl object-cover" />
        <h1 className="text-[#5F5B5B] font-poppins font-[600] text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px]">Ginger</h1>
        <button
          type="submit"
          className="w-1/2 bg-pink-button text-[#5F5B5B] py-2 rounded-lg hover:rounded-full font-poppins font-semibold text-[18px] shadow-lg border border-[rgba(95,91,91,0.3)]"
        >
          {loading ? "Loading..." : "Add Your Pet"}
        </button>

      </div>
    </div>
  );
}

export default PetDetails;
