import React from "react";
import footer from "../assets/HomePage/Footer.png";
import facebookIcon from "../assets/HomePage/facebook.png";
import instagramIcon from "../assets/HomePage/instagram.png";
import tiktokIcon from "../assets/HomePage/tiktok.png";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="w-full bg-pink-button relative py-8">
      {/* Background paw image */}
      <img src={footer} alt="Footer Design" className="absolute inset-0 w-full h-full object-cover" />

      {/* Content */}
      <div className="relative text-center">
        {/* Follow Us! Text */}
        <h2 className="text-gray-700 font-poppins font-semibold text-[28px] max-[430px]:text-[20px] lg:text-[27px] xl:text-[30px] 2xl:text-[30px] uppercase mb-4">
          Follow Us!
        </h2>

        {/* Horizontal Line */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-2/3 border-b-4 border-[#5F5B5BB2]"></div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          <Link href="#" className="hover:scale-105 transition-transform">
            <img src={facebookIcon} alt="Facebook" className="2xl:w-10 2xl:h-10 xl:w-10 xl:h-10 lg:w-9 lg:h-9 md:w-8 md:h-8 sm:w-7 sm:h-7 max-[430px]:w-5 max-[430px]:h-5" />
          </Link>
          <Link href="#" className="hover:scale-105 transition-transform">
            <img src={instagramIcon} alt="Instagram" className="2xl:w-10 2xl:h-10 xl:w-10 xl:h-10 lg:w-9 lg:h-9 md:w-8 md:h-8 sm:w-7 sm:h-7 max-[430px]:w-5 max-[430px]:h-5" />
          </Link>
          <Link href="#" className="hover:scale-105 transition-transform">
            <img src={tiktokIcon} alt="TikTok" className="2xl:w-10 2xl:h-10 xl:w-10 xl:h-10 lg:w-9 lg:h-9 md:w-8 md:h-8 sm:w-7 sm:h-7 max-[430px]:w-5 max-[430px]:h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
