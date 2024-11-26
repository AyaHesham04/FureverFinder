import Card from "../components/Card";
import temp1 from "../assets/TemporaryImages/cat1.jpg";
import temp2 from "../assets/TemporaryImages/cat2.jpg";
import temp3 from "../assets/TemporaryImages/cat3.jpg";
const catData = [
  {
    name: "Ginger",
    gender: "Female",
    imageSrc: temp1,
  },
  {
    name: "Whiskers",
    gender: "Male",
    imageSrc: temp2,
  },
  {
    name: "Luna",
    gender: "Female",
    imageSrc: temp3,
  },
];
function ProfilePage(props) {
  return (
    <div className="w-screen h-screen bg-pink-light flex justify-center items-center">
      <div className="w-5/6 h-full bg-white flex justify-center items-center py-2">
        <div className="bg-pink-button w-4/5 h-full flex flex-col justify-center items-center">
          <h1 className="text-[#5F5B5B] text-3xl font-semibold">
            Heidy El Fanan
          </h1>
          <div className="flex flex-col space-y-10 overflow-scroll scrollbar-hide lg:flex-row lg:space-y-0 w-full h-full justify-start items-center">
            {catData.map((cat, index) => (
              <Card key={index} {...cat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
