import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Heart,
  Eye,
  BadgeCheck,
  IndianRupee,
} from "lucide-react";

export default function PropertyCard({ property }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const priceFormat = Number(property.price || 0).toLocaleString("en-IN");

  useEffect(() => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyFavorite = favorites.some(
      (item) => item._id === property._id
    );

    setIsFavorite(alreadyFavorite);
  }, [property._id]);

  const handleFavorite = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      toast.error("Please login first");
      return;
    }

    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyFavorite = favorites.some(
      (item) => item._id === property._id
    );

    if (alreadyFavorite) {
      const updatedFavorites = favorites.filter(
        (item) => item._id !== property._id
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);
      toast.success("Removed from favorites");
    } else {
      const favoriteProperty = {
        _id: property._id,
        title: property.title,
        location: property.location || property.city,
        price: property.price,
        bedrooms: property.bedrooms || property.rooms || 3,
        bathrooms: property.bathrooms || 2,
        image:
          property.images?.[0] ||
          "https://via.placeholder.com/600x400",
      };

      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, favoriteProperty])
      );

      setIsFavorite(true);
      toast.success("Added to favorites ❤️");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white/90 backdrop-blur-xl rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl border border-white/50 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={
            property.images?.[0] ||
            "https://via.placeholder.com/600x400"
          }
          alt={property.title}
          className="h-64 sm:h-72 w-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-lg px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg text-gray-800">
          {property.purpose === "rent" ? "For Rent" : "For Sale"}
        </div>

        <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
          {property.type || "Apartment"}
        </div>

        {property.isFeatured && (
          <div className="absolute bottom-24 left-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <BadgeCheck size={15} />
            Featured
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end gap-3">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-2xl shadow-xl">
            <p className="text-xs opacity-80">
              {property.purpose === "rent" ? "Monthly Rent" : "Price"}
            </p>

            <h2 className="text-xl sm:text-2xl font-bold flex items-center">
              <IndianRupee size={20} />
              {priceFormat}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleFavorite}
            className={`p-3 rounded-full shadow-lg hover:scale-110 transition ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/90 text-red-500"
            }`}
          >
            <Heart
              size={20}
              fill={isFavorite ? "white" : "none"}
            />
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 line-clamp-1">
          {property.title}
        </h2>

        <div className="flex items-center gap-2 mt-3 text-gray-500">
          <MapPin size={18} />

          <p className="line-clamp-1">
            {property.location || property.city}
          </p>
        </div>

        <p className="mt-4 text-gray-600 leading-7 line-clamp-2 text-sm sm:text-base">
          {property.description ||
            "Modern architecture with luxury interiors, spacious rooms, and premium lifestyle amenities."}
        </p>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-slate-100 rounded-2xl py-4 text-center">
            <BedDouble size={21} className="mx-auto text-blue-600" />

            <p className="mt-2 font-bold text-gray-700">
              {property.bedrooms || property.rooms || 3}
            </p>

            <span className="text-[11px] sm:text-xs text-gray-500">
              Beds
            </span>
          </div>

          <div className="bg-slate-100 rounded-2xl py-4 text-center">
            <Bath size={21} className="mx-auto text-purple-600" />

            <p className="mt-2 font-bold text-gray-700">
              {property.bathrooms || 2}
            </p>

            <span className="text-[11px] sm:text-xs text-gray-500">
              Baths
            </span>
          </div>

          <div className="bg-slate-100 rounded-2xl py-4 text-center">
            <Maximize size={21} className="mx-auto text-green-600" />

            <p className="mt-2 font-bold text-gray-700">
              {property.area || 1200}
            </p>

            <span className="text-[11px] sm:text-xs text-gray-500">
              Sq.ft
            </span>
          </div>
        </div>

        {property.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {property.amenities.slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-500 text-sm mt-5">
          <Eye size={16} />
          {property.views || 0} views
        </div>

        <Link to={`/property/${property._id}`}>
          <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition cursor-pointer">
            View Details →
          </button>
        </Link>
      </div>
    </motion.div>
  );
}