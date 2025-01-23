import { useEffect, useState } from "react";
import background from "../assets/PetDetailsPage/PetDetailsBack.png";
import temp1 from "../assets/TemporaryImages/cat1.jpg";
import temp2 from "../assets/TemporaryImages/cat2.jpg";
import temp3 from "../assets/TemporaryImages/cat3.jpg";
import owner from "../assets/TemporaryImages/customer.jpg";
import BackButton from "../components/BackButton";
import MediaSlider from "../components/MediaPreviewList";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const PetDetails = (state) => {
  const location = useLocation();
  const petData = location.state.pet;
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);

  const openPhoneModal = () => {
    setIsPhoneOpen(true);
  };

  const closePhoneModal = () => {
    setIsPhoneOpen(false);
  };
  console.log(petData);
  const mediaData = [
    { url: "https://via.placeholder.com/300", type: "image" },
    { url: "https://www.w3schools.com/html/mov_bbb.mp4", type: "video" },
    { url: "https://via.placeholder.com/400", type: "image" },
    { url: "https://www.w3schools.com/html/movie.mp4", type: "video" },
  ];
  return (
    <div className="relative w-screen h-screen">
      <BackButton></BackButton>
      <img src={background} alt="Background" className="w-full min-h-screen" />
      <div className="absolute top-0 w-full flex flex-col 2xl:mt-24 xl:mt-16 lg:mt-16 md:mt-9 sm:mt-16 mt-10 items-center">
        <div className="rounded-lg border-[0.94px] border-[#F5F5F5] bg-[#FFE5E6] shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex items-center justify-center 2xl:p-10 2xl:pb-4 xl:p-8 xl:pb-4 lg:p-7 lg:pb-3 max-[430px]:p-4 max-[430px]:pb-2 p-6 pb-1 mb-2">
          <MediaSlider mediaList={petData.images} />
          {/* <MediaSlider mediaList={mediaData} /> */}
        </div>
        <h1 className="text-[#5F5B5B] font-poppins font-semibold max-[400px]:text-[17px] max-[430px]:text-[18px] sm:text-[24px] md:text-[25px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] md:pt-3 md:pb-2 pt-3 pb-1">
          {petData.name}
        </h1>
        <div className="flex items-center">

          <p className="text-[#5F5B5B] opacity-50 font-poppins font-[400] 2xl:text-[24px] xl:text-[17px] lg:text-[17px] md:text-[15px] sm:text-[15px] max-[430px]:text-xs">
            {petData.address}
          </p>
        </div>
        <div className="w-full flex justify-center items-center py-5 lg:py-6 md:py-4 mx-auto">
          <div className="grid max-[430px]:grid-cols-2  gap-5 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 max-[430px]:gap-5 max-[400px]:gap-5 sm:gap-5 mx-auto justify-center items-center">
            <div className="p-3 text-center rounded-lg border-[0.94px] border-[#F5F5F5] bg-[#FFE5E6] shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
              <h2 className="text-[#E6B9BA] font-poppins font-[600] text-[13px] 2xl:text-[21px] xl:text-[19px] lg:text-[17px] md:text-[16px] sm:text-[13px] max-[430px]:text-xs">
                {petData.gender}
              </h2>
              <h4 className="text-[#B4AEAE] font-poppins font-[400] text-[13px] 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[14px] sm:text-[13px] max-[430px]:text-xs">
                Gender
              </h4>
            </div>
            <div className="p-3 text-center rounded-lg border-[0.94px] border-[#F5F5F5] bg-[#FFE5E6] shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
              <h2 className="text-[#E6B9BA] font-poppins font-[600] text-[13px] 2xl:text-[21px] xl:text-[19px] lg:text-[17px] md:text-[16px] sm:text-[13px] max-[430px]:text-xs">
                {petData.year}yrs, {petData.month}mo
              </h2>
              <h4 className="text-[#B4AEAE] font-poppins font-[400] text-[13px] 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[14px] sm:text-[13px] max-[430px]:text-xs">
                Age
              </h4>
            </div>
            <div className="p-3 text-center rounded-lg border-[0.94px] border-[#F5F5F5] bg-[#FFE5E6] shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
              <h2 className="text-[#E6B9BA] font-poppins font-[600] text-[13px] 2xl:text-[21px] xl:text-[19px] lg:text-[17px] md:text-[16px] sm:text-[13px] max-[430px]:text-xs">
                {petData.weight}Kg
              </h2>
              <h4 className="text-[#B4AEAE] font-poppins font-[400] text-[13px] 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[14px] sm:text-[13px] max-[430px]:text-xs">
                Weight
              </h4>
            </div>
            <div className="p-3 text-center rounded-lg border-[0.94px] border-[#F5F5F5] bg-[#FFE5E6] shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
              <h2 className="text-[#E6B9BA] font-poppins font-[600] text-[13px] 2xl:text-[21px] xl:text-[19px] lg:text-[17px] md:text-[16px] sm:text-[13px] max-[430px]:text-xs">
                {petData.status}
              </h2>
              <h4 className="text-[#B4AEAE] font-poppins font-[400] text-[13px] 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[14px] sm:text-[13px] max-[430px]:text-xs">
                Connection
              </h4>
            </div>
          </div>
        </div>
        <div className="w-3/5 max-[430px]:w-3/4 flex justify-center items-center py-5 lg:py-6 md:py-4 mx-auto">
          <div className="w-full flex items-start gap-2 sm:gap-3 p-4">
            <div className="flex-grow">
              <p className="text-[#B4AEAE] font-poppins font-[400] text-[13px] 2xl:text-[22px] xl:text-[16px] lg:text-[15px] md:text-[14px] sm:text-[13px] max-[430px]:text-xs">
                Owner by:
              </p>
              <p className="font-poppins font-[500] 2xl:text-[22px] text-[13px] xl:text-[17px] lg:text-[15px] md:text-[14px] sm:text-[13px] max-[430px]:text-xs text-[#5F5B5B]">
                {petData.user?.fname} {petData.user?.lname}
              </p>

              <p className="mt-3 text-[#5F5B5BB2] font-poppins font-[500] text-[14px] 2xl:text-[20px] xl:text-[17px] lg:text-[16px] md:text-[15px] sm:text-[14px] max-[430px]:text-xs">
                {petData.description}
              </p>
            </div>

            <div className="flex-shrink-0">
              <div
                onClick={openPhoneModal}
                className="cursor-pointer 2xl:w-10 2xl:h-10 xl:w-10 xl:h-10 lg:w-8 lg:h-8 md:w-8 md:h-8 sm:w-8 sm:h-8 max-[560px]:w-7 max-[560px]:h-7 max-[430px]:w-7 max-[430px]:h-7 bg-[#FFE5E6] flex items-center justify-center rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-8 lg:h-8 md:w-7 md:h-7 sm:w-6 sm:h-6 max-[430px]:w-5 max-[430px]:h-5 text-white"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79a15.54 15.54 0 006.59 6.59l2.2-2.2a1 1 0 01.91-.27 11.36 11.36 0 003.58.57 1 1 0 011 1v3.11a1 1 0 01-1 1A16.91 16.91 0 013 4.92a1 1 0 011-1h3.11a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.27.91z" />
                </svg>
              </div>
            </div>
            {isPhoneOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 w-80">
                  <h2 className="text-[#E6B9BA] font-bold mb-4 2xl:text-[26px] xl:text-[24px] lg:text-[22px] md:text-[21px] sm:text-[18px] max-[430px]:text-[16px]">Phone Number</h2>
                  <p className="mb-4 text-[16px] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[19px] sm:text-[16px] max-[430px]:text-[14px]">{petData.user.phone}</p>
                  <div className="flex justify-end">
                    <button
                      onClick={closePhoneModal}
                      className="bg-red-500 text-[13px] 2xl:text-[21px] xl:text-[19px] lg:text-[17px] md:text-[16px] sm:text-[13px] max-[430px]:text-[11px] text-white p-1.5 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
