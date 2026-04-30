import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {

  return (

    <Link to={`/property/${property._id}`}>

      <motion.div
        whileHover={{
          y: -10,
          scale: 1.02,
        }}
        transition={{ duration: 0.3 }}
        className="
          group
          bg-white
          rounded-[30px]
          overflow-hidden
          shadow-lg
          hover:shadow-2xl
          transition
          duration-300
          border
          border-gray-100
        "
      >

        {/* IMAGE SECTION */}

        <div className="relative overflow-hidden">

          <img
            src={
              property.images?.[0] ||
              "https://via.placeholder.com/400x300"
            }
            alt={property.title}
            className="
              h-72
              w-full
              object-cover
              group-hover:scale-110
              transition
              duration-500
            "
          />

          {/* PROPERTY TYPE */}

          <div
            className="
              absolute
              top-4
              left-4
              bg-white/90
              backdrop-blur-md
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
              shadow-md
            "
          >
            {property.type || "Premium Home"}
          </div>

          {/* PRICE */}

          <div
            className="
              absolute
              bottom-4
              right-4
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              text-white
              px-5
              py-2
              rounded-full
              font-bold
              shadow-lg
            "
          >
            ₹ {property.price}
          </div>

        </div>

        {/* CONTENT */}

        <div className="p-6">

          <div className="flex justify-between items-start">

            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-gray-800
                  line-clamp-1
                "
              >
                {property.title}
              </h2>

              <p
                className="
                  text-gray-500
                  mt-2
                  flex
                  items-center
                  gap-2
                "
              >
                📍 {property.location}
              </p>

            </div>

          </div>

          {/* DESCRIPTION */}

          <p
            className="
              text-gray-600
              mt-4
              leading-7
              line-clamp-2
            "
          >
            {property.description ||
              "Luxury property with premium interiors, spacious rooms, and modern lifestyle amenities."}
          </p>

          {/* PROPERTY DETAILS */}

          <div
            className="
              flex
              justify-between
              items-center
              mt-6
              border-t
              pt-5
            "
          >

            <div className="text-center">

              <p className="text-xl font-bold">
                🛏 {property.bedrooms || 3}
              </p>

              <p className="text-sm text-gray-500">
                Bedrooms
              </p>

            </div>

            <div className="text-center">

              <p className="text-xl font-bold">
                🛁 {property.bathrooms || 2}
              </p>

              <p className="text-sm text-gray-500">
                Bathrooms
              </p>

            </div>

            <div className="text-center">

              <p className="text-xl font-bold">
                📐 {property.area || 2400}
              </p>

              <p className="text-sm text-gray-500">
                Sq.ft
              </p>

            </div>

          </div>

          {/* BUTTON */}

          <button
            className="
              mt-6
              w-full
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              text-white
              py-3
              rounded-2xl
              font-semibold
              hover:scale-[1.02]
              transition
              duration-300
              shadow-lg
            "
          >
            View Details →
          </button>

        </div>

      </motion.div>

    </Link>

  );
}