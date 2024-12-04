import background from "../assets/PetDetailsPage/PetDetailsBack.png";
import temp1 from "../assets/TemporaryImages/cat1.jpg";
import temp2 from "../assets/TemporaryImages/cat2.jpg";
import temp3 from "../assets/TemporaryImages/cat3.jpg";
import BackButton from "../components/BackButton";
import MediaSlider from "../components/MediaPreviewList";

const PetDetails = () => {
  const mediaData = [
    { url: "https://via.placeholder.com/300", type: "image" },
    { url: "https://www.w3schools.com/html/mov_bbb.mp4", type: "video" },
    { url: "https://via.placeholder.com/400", type: "image" },
    { url: "https://www.w3schools.com/html/movie.mp4", type: "video" },
  ];
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <BackButton></BackButton>
      <img src={background} alt="Background" className="w-full h-full" />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="bg-[#FFE5E6] flex items-center justify-center absolute top-14 p-6 rounded-lg shadow-lg">
          <MediaSlider mediaList={mediaData} />
        </div>
        <h1 className="text-[#5F5B5B] absolute max-[400px]:top-[16rem] max-[430px]:top-[17rem] sm:top-80 md:top-[22rem] lg:top-96 xl:top-96 2xl:top-80 font-poppins font-semibold text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px]">
          Categories
        </h1>
      </div>
    </div>
  );
}

export default PetDetails;
