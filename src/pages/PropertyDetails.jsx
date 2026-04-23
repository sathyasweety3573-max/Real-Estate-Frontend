import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    API.get(`/property/${id}`).then((res) => {
      setProperty(res.data);
    });
  }, [id]);

  if (!property) return <p>Loading...</p>;

  const handleFavorite = async () => {
  try {
    await API.post(`/property/favorite/${property._id}`);
    alert("Added to favourite ❤️");
  } catch {
    alert("Login required ❌");
  }
};

const handleBooking = async () => {
  try {
    await API.post(`/booking/${property._id}`);
    alert("Booked successfully 🏷");
  } catch {
    alert("Login required ❌");
  }
};

  return (
    <div>
      <Navbar />

      <div className="p-10 grid md:grid-cols-2 gap-10 items-start">
  <img
  src={
    property.images?.[0] ||
    "https://via.placeholder.com/100x200"
  }
  alt={property.title}
  className="rounded-2xl h-[500px] w-full object-cover shadow-xl"
/>

        <div>
          <h1 className="text-5xl font-bold text-gray-800">
  {property.title}
</h1>
          <p className="text-gray-500 text-xl mt-2">
  📍 {property.location}
</p>
    <p className="mt-6 text-gray-600 leading-8 text-lg">
  {property.description ||
    "This beautiful premium property offers modern architecture, spacious rooms, luxury interiors, peaceful surroundings, and a comfortable lifestyle perfect for families and smart investors."}
</p>

          <h2 className="mt-6 text-4xl font-bold text-blue-600">
  ₹ {property.price}
</h2>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">
           <button
  onClick={handleBooking}
className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-2xl">
  Book Now
</button>

           <button
  onClick={handleFavorite}
className="bg-pink-500 hover:bg-pink-600 transition text-white px-6 py-3 rounded-2xl"
>
  ❤️ Favourite
</button>

<div className="fixed bottom-6 right-6 z-50">

  <button
    onClick={() => window.history.back()}
    className="
      bg-black
      text-white
      px-5
      py-3
      rounded-xl
      shadow-lg
      hover:scale-105
      hover:bg-gray-800
      transition
      duration-300
    "
  >
    ← Back
  </button>

</div>

  </div>
          </div>
        </div>
      </div>
  );
}