import male from "../assets/HomePage/Male.png";
import female from "../assets/HomePage/Female.png";
import editIcon from "../assets/HomePage/edit.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function Card(pet, { canDelete = false }, onDelete, type) {
  // Add `id` to props
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false); // State to manage loading during deletion

  // const handleEditClick = () => {
  //   console.log("Card: ", pet);
  //   navigate("/update-pet", {
  //     state: { pet }, // Pass the pet object to the update page
  //   });
  // };
  const handleCardClick = () => {
    navigate(`/pet/${pet.id}`, {
      state: { pet },
    });
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true); // Set loading state
      const token = getCookie("auth_token"); // Assuming you have a function to get the cookie
      const response = await fetch(`https://api-fureverfinders.amrnabih.com/api/user/deletepet`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token for authentication
        },
        body: JSON.stringify({
          id: pet.id,
          type: pet.type,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Handle successful delete, maybe refresh the page or update the state
        toast.success("Pet deleted:", result);
        onDelete(pet.id);
      } else {
        // Handle errors (e.g., validation or backend errors)
        toast.error("Delete failed:", result);
      }
    } catch (error) {
      toast.error("Error deleting pet:", error);

      console.error();
    } finally {
      setIsDeleting(false); // Reset loading state
    }
  };

  return (
    <div
      className="grid grid-cols-1 justify-center items-center max-[400px]:w-[130px] max-[400px]:h-[180px] max-[430px]:w-[120px] max-[430px]:h-[180px] max-[560px]:w-[200px] max-[560px]:h-[210px] sm:w-[155px] sm:h-[220px] md:w-[170px] md:h-[220px] lg:w-[180px] lg:h-[240px] xl:w-[195px] xl:h-[280px] 2xl:w-[280px] 2xl:h-[320px] bg-pink-button p-2 rounded-[30px] shadow-lg hover:cursor-pointer my-1 sm:my-3"
    >
      <div className="max-[400px]:w-[90px] max-[400px]:h-[100px] max-[430px]:w-[100px] max-[430px]:h-[80px] max-[560px]:w-[125px] max-[560px]:h-[130px] sm:w-[140px] sm:h-[140px] md:w-[155px] md:h-[150px] lg:w-[155px] lg:h-[155px] xl:w-[170px] xl:h-[180px] 2xl:w-[255px] 2xl:h-[220px] mx-auto">
        <img
          onClick={handleCardClick}
          src={pet.images[0].url}
          alt={pet.name}
          className="w-full h-full rounded-[20px]"
        />
      </div>

      <div className="flex justify-between items-center">
        <h2 onClick={handleCardClick} className="p-1 text-[17px] max-[400px]:text-xs max-[430px]:text-[14px] sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-poppins font-semibold text-[#5F5B5B]">
          {pet.name}
        </h2>
        <div className="flex items-center">
          {pet.canDelete ? (
            <div className="flex items-center justify-between space-x-1">
              {/* <div className="rounded-full bg-white sm:p-1 p-1">
                <svg
                  onClick={handleEditClick}
                  className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[430px]:w-4 max-[430px]:h-4 max-[400px]:w-4 max-[400px]:h-4 inline-block text-[#424242] hover:text-[#7BCFD180] rounded cursor-pointer"
                  viewBox="0 0 24 24"
                  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                >
                  <path
                    d="M4 20h4l10-10-4-4L4 16v4z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 6l4 4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div> */}
              <div className="rounded-full bg-white sm:p-1 p-1">
                <svg
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from triggering
                    handleDelete(); // Call delete function
                  }}
                  className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[430px]:w-4 max-[430px]:h-4 max-[400px]:w-4 max-[400px]:h-4 inline-block text-[#424242] hover:text-[#7BCFD180] rounded cursor-pointer"
                  viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                >
                  <g id="Page-1" stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd" sketch:type="MSPage">
                    <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-259.000000, -203.000000)" fill="currentColor">
                      <path d="M282,211 L262,211 C261.448,211 261,210.553 261,210 C261,209.448 261.448,209 262,209 L282,209 C282.552,209 283,209.448 283,210 C283,210.553 282.552,211 282,211 L282,211 Z M281,231 C281,232.104 280.104,233 279,233 L265,233 C263.896,233 263,232.104 263,231 L263,213 L281,213 L281,231 L281,231 Z M269,206 C269,205.447 269.448,205 270,205 L274,205 C274.552,205 275,205.447 275,206 L275,207 L269,207 L269,206 L269,206 Z M283,207 L277,207 L277,205 C277,203.896 276.104,203 275,203 L269,203 C267.896,203 267,203.896 267,205 L267,207 L261,207 C259.896,207 259,207.896 259,209 L259,211 C259,212.104 259.896,213 261,213 L261,231 C261,233.209 262.791,235 265,235 L279,235 C281.209,235 283,233.209 283,231 L283,213 C284.104,213 285,212.104 285,211 L285,209 C285,207.896 284.104,207 283,207 L283,207 Z M272,231 C272.552,231 273,230.553 273,230 L273,218 C273,217.448 272.552,217 272,217 C271.448,217 271,217.448 271,218 L271,230 C271,230.553 271.448,231 272,231 L272,231 Z M267,231 C267.552,231 268,230.553 268,230 L268,218 C268,217.448 267.552,217 267,217 C266.448,217 266,217.448 266,218 L266,230 C266,230.553 266.448,231 267,231 L267,231 Z M277,231 C277.552,231 278,230.553 278,230 L278,218 C278,217.448 277.552,217 277,217 C276.448,217 276,217.448 276,218 L276,230 C276,230.553 276.448,231 277,231 L277,231 Z" id="trash" sketch:type="MSShapeGroup">
                      </path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          ) : pet.gender === "male" ? (
            <div className="rounded-full bg-white max-[400px]:w-[25px] max-[430px]:w-[30px] w-[35px] sm:w-[35px] md:w-[35px] lg:w-[40px] xl:w-[45px] 2xl:w-[60px]">
              <img src={male} alt="Male icon" />
            </div>
          ) : (
            <div className="rounded-full bg-white max-[400px]:w-[25px] max-[430px]:w-[30px] w-[35px] sm:w-[35px] md:w-[35px] lg:w-[40px] xl:w-[45px] 2xl:w-[60px]">
              <img src={female} alt="female icon" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}
