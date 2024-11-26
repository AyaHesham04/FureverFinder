import React from 'react'
import dog from "../../assets/HomePage/LandingPageDog.png";
import cat from "../../assets/HomePage/LandingPageCat.png";

const Categories = () => {
    return (
        <div className="mx-auto w-full py-5 grid grid-cols-1 justify-center items-center">
            <h1 className="text-[#5F5B5B] font-poppins font-semibold text-[36px] my-9 ml-24">Categories</h1>
            <div className="grid grid-cols-2 gap-x-24 justify-center items-center w-1/2 mx-auto h-full">
                <div className="bg-pink-button w-full h-full grid grid-cols-1 justify-center items-center p-5 rounded-lg shadow-lg">
                    <div className="h-[70%]"><img src={cat} className="w-full" /></div>
                    <div className="h-[30%] place-self-center"><button className="bg-[#7BCFD180] px-5 py-2 border border-[rgba(95,91,91,0.3)] rounded-lg">Cats</button></div>
                </div>
                <div className="bg-pink-button w-full h-full grid grid-cols-1 justify-center items-center p-5 rounded-lg shadow-lg">
                    <div className="h-[70%]"><img src={dog} className="w-[85%] h-full" /></div>
                    <div className="h-[30%] place-self-center"><button className="bg-[#7BCFD180] px-5 py-2 border border-[rgba(95,91,91,0.3)] rounded-lg">Dogs</button></div>
                </div>
            </div>
        </div>
    )
}

export default Categories