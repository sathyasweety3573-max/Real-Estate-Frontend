import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  IndianRupee,
  Trash2,
  Eye,
} from "lucide-react";

import toast from "react-hot-toast";

export default function Favorites() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(
      (property) => property._id !== id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    toast.success("Removed from favorites");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-pink-50 to-red-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Favorite Properties ❤️
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            View all your saved favorite properties.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-[35px] shadow-2xl p-14 text-center border border-white/40">
            <div className="w-28 h-28 mx-auto rounded-full bg-pink-100 flex items-center justify-center">
              <Heart
                size={50}
                className="text-pink-600"
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mt-8">
              No Favorite Properties
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              You have not added any favorite property yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {favorites.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-[35px] overflow-hidden shadow-2xl hover:scale-[1.02] transition"
              >
                <img
                  src={
                    property.image ||
                    property.images?.[0] ||
                    "https://via.placeholder.com/500x300"
                  }
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {property.title || "Property"}
                  </h2>

                  <p className="flex items-center gap-2 text-gray-500 mt-3">
                    <MapPin size={18} />
                    {property.location || "Location not available"}
                  </p>

                  <div className="flex gap-6 mt-5 text-gray-600">
                    <div className="flex items-center gap-2">
                      <BedDouble size={18} />
                      {property.bedrooms || property.rooms || 3}
                    </div>

                    <div className="flex items-center gap-2">
                      <Bath size={18} />
                      {property.bathrooms || 2}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-1 text-3xl font-extrabold text-pink-600">
                    <IndianRupee size={28} />
                    {Number(property.price || 0).toLocaleString("en-IN")}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => navigate(`/property/${property._id}`)}
                      className="bg-blue-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                    >
                      <Eye size={18} />
                      View
                    </button>

                    <button
                      onClick={() => removeFavorite(property._id)}
                      className="bg-red-500 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}