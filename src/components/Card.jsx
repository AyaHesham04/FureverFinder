import male from "../assets/HomePage/Male.png";
import female from "../assets/HomePage/Female.png";
import deleteIcon from "../assets/HomePage/R.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function Card(pet, { canDelete = false }) {
  // Add `id` to props
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false); // State to manage loading during deletion

  const handleCardClick = () => {
    navigate(`/pet/${pet.id}`, {
      state: { pet },
    });
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true); // Set loading state
      const token = getCookie("auth_token"); // Assuming you have a function to get the cookie
      const response = await fetch("http://127.0.0.1:8000/api/user/deletepet", {
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
        navigate("/profile");
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
      onClick={handleCardClick}
      className="max-[400px]:w-[100px] max-[400px]:h-[180px] max-[430px]:w-[120px] max-[560px]:h-[200px] w-[170px] h-[260px] md:w-[190px] md:h-[260px] 2xl:w-[280px] 2xl:h-[400px] bg-pink-button p-2 rounded-[30px] shadow-lg hover:cursor-pointer my-1 sm:my-3"
    >
      <div className="max-[400px]:w-[80px] max-[400px]:h-[100px] max-[430px]:w-[100px] max-[430px]:h-[120px] w-[150px] h-[170px] md:w-[160px] md:h-[180px] 2xl:w-[250px] 2xl:h-[270px] mx-auto">
        <img
          src={pet.images[0]}
          alt={pet.name}
          className="w-full h-full object-cover rounded-[20px]"
        />
      </div>

      <div className="flex justify-between items-center mt-4 2xl:mt-5">
        <h2 className="p-1 text-[20px] max-[430px]:text-[16px] lg:text-[24px] xl:text-[24px] 2xl:text-[30px] font-poppins font-semibold leading-[36px] tracking-[1%] text-[#5F5B5B]">
          {pet.name}
        </h2>
        <div className="flex items-center">
          {pet.canDelete ? (
            <div className="rounded-full bg-white sm:p-2">
              <svg
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from triggering
                  handleDelete(); // Call delete function
                }}
                className="2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-5 md:h-5 sm:w-5 sm:h-5 max-[430px]:w-4 max-[430px]:h-4 inline-block text-[#424242] hover:text-[#7BCFD180] rounded cursor-pointer"
                viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                <g id="Page-1" stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd" sketch:type="MSPage">
                  <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-259.000000, -203.000000)" fill="currentColor">
                    <path d="M282,211 L262,211 C261.448,211 261,210.553 261,210 C261,209.448 261.448,209 262,209 L282,209 C282.552,209 283,209.448 283,210 C283,210.553 282.552,211 282,211 L282,211 Z M281,231 C281,232.104 280.104,233 279,233 L265,233 C263.896,233 263,232.104 263,231 L263,213 L281,213 L281,231 L281,231 Z M269,206 C269,205.447 269.448,205 270,205 L274,205 C274.552,205 275,205.447 275,206 L275,207 L269,207 L269,206 L269,206 Z M283,207 L277,207 L277,205 C277,203.896 276.104,203 275,203 L269,203 C267.896,203 267,203.896 267,205 L267,207 L261,207 C259.896,207 259,207.896 259,209 L259,211 C259,212.104 259.896,213 261,213 L261,231 C261,233.209 262.791,235 265,235 L279,235 C281.209,235 283,233.209 283,231 L283,213 C284.104,213 285,212.104 285,211 L285,209 C285,207.896 284.104,207 283,207 L283,207 Z M272,231 C272.552,231 273,230.553 273,230 L273,218 C273,217.448 272.552,217 272,217 C271.448,217 271,217.448 271,218 L271,230 C271,230.553 271.448,231 272,231 L272,231 Z M267,231 C267.552,231 268,230.553 268,230 L268,218 C268,217.448 267.552,217 267,217 C266.448,217 266,217.448 266,218 L266,230 C266,230.553 266.448,231 267,231 L267,231 Z M277,231 C277.552,231 278,230.553 278,230 L278,218 C278,217.448 277.552,217 277,217 C276.448,217 276,217.448 276,218 L276,230 C276,230.553 276.448,231 277,231 L277,231 Z" id="trash" sketch:type="MSShapeGroup">
                    </path>
                  </g>
                </g>
              </svg>

            </div>
          ) : pet.gender === "male" ? (
            <div className="rounded-full bg-white max-[400px]:w-[25px] max-[430px]:w-[30px] w-[40px] md:w-[50px] 2xl:w-[80px]">
              <img src={male} alt="Male icon" />
            </div>
          ) : (
            <div className="rounded-full bg-white max-[400px]:w-[25px] max-[430px]:w-[30px] w-[40px] md:w-[50px] 2xl:w-[80px]">
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
