import background from "../assets/Home_page.png";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
const StartPage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <BackButton></BackButton>

      <img src={background} alt="Background" className="w-full h-full" />
      <div className="absolute top-0  w-full h-full flex flex-col justify-center items-center">
        <h1>asdasd</h1>
        <div>
          <Link
            to="/signup"
            className="w-1/2 bg-pink-button text-[#5F5B5B] py-2 rounded-lg hover:rounded-full font-poppins font-semibold text-[18px] max-[430px]:text-[14px] 2xl:text-[18px] shadow-lg border border-[rgba(95,91,91,0.3)]"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="w-1/2 bg-pink-button text-[#5F5B5B] py-2 rounded-lg hover:rounded-full font-poppins font-semibold text-[18px] max-[430px]:text-[14px] 2xl:text-[18px] shadow-lg border border-[rgba(95,91,91,0.3)]"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
