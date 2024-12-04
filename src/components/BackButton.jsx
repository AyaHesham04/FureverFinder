import { Link } from "react-router-dom";
import backArrow from "../assets/back.png"; // Replace with your actual image path

// eslint-disable-next-line react/prop-types
function BackButton({ redirectTo = "/" }) {
  return (
    <Link
      to={redirectTo} // Replace with the desired back link
      className="items-center absolute left-[15%] top-[5%] z-10"
    >
      <img
        src={backArrow}
        alt="Back"
        className="w-12 h-12 max-[430px]:w-8 max-[430px]:h-8 transition-transform hover:scale-110"
      />
    </Link>
  );
}

export default BackButton;
