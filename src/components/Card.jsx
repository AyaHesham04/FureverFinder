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
      console.log(token);
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
      className="max-[430px]:w-[120px] max-[560px]:h-[200px] w-[190px] h-[270px] md:w-[190px] md:h-[260px] 2xl:w-[280px] 2xl:h-[400px] bg-pink-button p-2 rounded-[30px] shadow-lg hover:cursor-pointer my-1 sm:my-3"
    >
      <div className="max-[430px]:w-[100px] max-[430px]:h-[120px] w-[175px] h-[190px] md:w-[160px] md:h-[180px] 2xl:w-[250px] 2xl:h-[270px] mx-auto">
        <img
          src={pet.images[0]}
          alt={pet.name}
          className="w-full h-full object-cover rounded-[20px]"
        />
      </div>

      <div className="flex justify-between items-center mt-4 2xl:mt-5">
        <h2 className="text-[20px] max-[430px]:text-[16px] lg:text-[24px] xl:text-[24px] 2xl:text-[30px] font-poppins font-semibold leading-[36px] tracking-[1%] text-[#5F5B5B]">
          {pet.name}
        </h2>
        <div className="flex items-center">
          <div className="rounded-full bg-white max-[400px]:w-[25px] max-[430px]:w-[30px] w-[40px] md:w-[50px] 2xl:w-[80px]">
            {pet.canDelete ? (
              <img
                src={deleteIcon}
                alt="Delete icon"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from triggering
                  handleDelete(); // Call delete function
                }}
              />
            ) : pet.gender === "male" ? (
              <img src={male} alt="Male icon" />
            ) : (
              <img src={female} alt="Female icon" />
            )}
          </div>
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
