import { Link } from "react-router-dom";
import backArrow from "../assets/back.png"; // Replace with your actual image path

// eslint-disable-next-line react/prop-types
function BackButton({ redirectTo = "/" }) {
  return (
    <Link
      to={redirectTo} // Replace with the desired back link
      className="items-center absolute left-[13%] top-[5%] z-10"
    >
      <img
        src={backArrow}
        alt="Back"
        className="z-10 2xl:w-10 2xl:h-10 xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-9 md:h-9 sm:w-8 sm:h-8 max-[560px]:w-9 max-[560px]:h-9 max-[430px]:w-7 max-[430px]:h-7 transition-transform hover:scale-110"
      />
    </Link>
  );
}

export default BackButton;
