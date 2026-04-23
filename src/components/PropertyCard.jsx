import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function PropertyCard({ property }) {
  return (
    <Link to={`/property/${property._id}`}>

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
    >

      <img
        src={
          property.images?.[0] ||
          "https://via.placeholder.com/400x300"
        }
        alt={property.title}
        className="h-64 w-full object-cover"
      />
      <div className="p-4">

        <h2 className="text-xl font-semibold">
          {property.title}
        </h2>

        <p className="text-gray-500">
          {property.location}
        </p>
        <p className="text-blue-600 font-bold mt-2">
          ₹ {property.price}
        </p>

      </div>

  
    </motion.div>

  </Link>
  
  );
}