import background from "../assets/PetDetailsPage/PetDetailsBack.png";
import temp1 from "../assets/TemporaryImages/cat1.jpg";
import MediaSlider from "../components/MediaPreviewList";

const PetDetails = () => {
  const mediaData = [
    { url: "https://via.placeholder.com/300", type: "image" },
    { url: "https://www.w3schools.com/html/mov_bbb.mp4", type: "video" },
    { url: "https://via.placeholder.com/400", type: "image" },
    { url: "https://www.w3schools.com/html/movie.mp4", type: "video" },
  ];
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <MediaSlider mediaList={mediaData} />
    </div>
  );
}

export default PetDetails;
