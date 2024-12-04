import background from "../assets/Home_page.png";
import { Link } from "react-router-dom";
import backArrow from "../assets/back.png"; // Replace with your actual image path

const StartPage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Link
        to="/" // Replace with the desired back link
        className="items-center absolute left-[93%] top-[5%] z-10"
      >
        <img
          src={backArrow}
          alt="Back"
          className="w-12 h-12 max-[430px]:w-8 max-[430px]:h-8 transition-transform hover:scale-110"
        />
      </Link>

      <img src={background} alt="Background" className="w-full h-full" />
      <div className="absolute top-0 w-5/12 max-[430px]:w-full h-full flex flex-col justify-center items-center max-[430px]:pl-2 sm:pl-5 md:pl-8 lg:pl-10 xl:pl-10 2xl:pl-12">
        <div class="font-poppins text-[18px] max-[430px]:text-[14px] 2xl:text-[18px] font-bold italic relative inline-block">
          <span class="absolute inset-0 text-transparent stroke-text text-[#FFE5E6]">Welcome to FUREVER FINDERS—where paws meet hearts! Every furry friend deserves a loving home, and we&apos;re here to help you find your perfect fur-ever companion. Let&apos;s make tails wag and hearts smile together!</span>
          <span class="text-[#5F5B5B]">Welcome to FUREVER FINDERS—where paws meet hearts! Every furry friend deserves a loving home, and we&apos;re here to help you find your perfect fur-ever companion. Let&apos;s make tails wag and hearts smile together!</span>
        </div>
        <div className="w-full grid grid-cols-2 max-[430px]:gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 xl:gap-x-10 2xl:gap-x-12 justify-between text-center my-5">
          <Link
            to="/signup"
            className="w-11/12 bg-pink-button text-[#5F5B5B] py-2 rounded-lg hover:rounded-full font-poppins font-semibold text-[18px] max-[430px]:text-[14px] 2xl:text-[18px] shadow-lg border border-[rgba(95,91,91,0.3)]"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="w-11/12 bg-pink-button text-[#5F5B5B] py-2 rounded-lg hover:rounded-full font-poppins font-semibold text-[18px] max-[430px]:text-[14px] 2xl:text-[18px] shadow-lg border border-[rgba(95,91,91,0.3)]"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
