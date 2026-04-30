import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function PropertyDetails() {

  const { id } = useParams();

  const [property, setProperty] =
    useState(null);

  const [bookingSuccess, setBookingSuccess] =
    useState(false);

  // ================= FETCH PROPERTY =================

  useEffect(() => {

    const fetchProperty = async () => {

      try {

        const res = await API.get(
          `/property/${id}`
        );

        setProperty(res.data);

      } catch (err) {

        toast.error(
          "Failed to load property ❌"
        );

      }

    };

    fetchProperty();

  }, [id]);

  // ================= LOADING =================

  if (!property) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-slate-100
        via-blue-50
        to-purple-100
      ">

        <div className="
          bg-white
          px-10
          py-6
          rounded-3xl
          shadow-2xl
          text-2xl
          font-bold
          text-gray-700
        ">
          Loading Property...
        </div>

      </div>

    );

  }

  // ================= FAVORITE =================

  const handleFavorite = async () => {

    try {

      await API.post(
        `/property/favorite/${property._id}`
      );

      toast.success(
        "Added to Favourite ❤️"
      );

    } catch {

      toast.error(
        "Please login first ❌"
      );

    }

  };

  // ================= BOOKING =================

  const handleBooking = async () => {

    try {

      await API.post(
        `/booking/${property._id}`
      );

      setBookingSuccess(true);

      toast.success(
        "Booking Request Sent 🏡"
      );

    } catch {

      toast.error(
        "Please login first ❌"
      );

    }

  };

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-blue-50
      to-purple-100
    ">

      <Navbar />

      {/* MAIN SECTION */}

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-12
      ">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            grid
            lg:grid-cols-2
            gap-12
            items-start
          "
        >

          {/* IMAGE SECTION */}

          <div className="relative">

            <img
              src={
                property.images?.[0] ||
                "https://via.placeholder.com/600x400"
              }
              alt={property.title}
              className="
                rounded-[35px]
                h-[600px]
                w-full
                object-cover
                shadow-2xl
                border-4
                border-white
              "
            />

            {/* PRICE CARD */}

            <div className="
              absolute
              top-6
              left-6
              bg-white/90
              backdrop-blur-lg
              px-6
              py-4
              rounded-2xl
              shadow-xl
            ">

              <p className="
                text-sm
                text-gray-500
              ">
                Starting Price
              </p>

              <h2 className="
                text-3xl
                font-bold
                text-blue-600
              ">
                ₹ {property.price}
              </h2>

            </div>

          </div>

          {/* DETAILS SECTION */}

          <div>

            {/* TITLE */}

            <h1 className="
              text-5xl
              lg:text-6xl
              font-extrabold
              text-gray-900
              leading-tight
            ">
              {property.title}
            </h1>

            {/* LOCATION */}

            <p className="
              mt-5
              text-2xl
              text-gray-600
            ">
              📍 {property.location}
            </p>

            {/* DESCRIPTION */}

            <div className="
              mt-8
              bg-white/70
              backdrop-blur-xl
              rounded-3xl
              p-8
              shadow-xl
              border
              border-white/40
            ">

              <h3 className="
                text-3xl
                font-bold
                text-gray-800
                mb-5
              ">
                Property Description
              </h3>

              <p className="
                text-gray-600
                leading-9
                text-lg
              ">

                {
                  property.description ||

                  "This beautiful premium property offers modern architecture, spacious rooms, luxury interiors, peaceful surroundings, and a comfortable lifestyle perfect for families and smart investors."
                }

              </p>

            </div>

            {/* FEATURES */}

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-5
              mt-8
            ">

              <div className="
                bg-white
                rounded-3xl
                p-6
                shadow-lg
                text-center
              ">

                <h3 className="text-4xl">
                  🛏️
                </h3>

                <p className="
                  mt-3
                  font-semibold
                ">
                  Luxury Rooms
                </p>

              </div>

              <div className="
                bg-white
                rounded-3xl
                p-6
                shadow-lg
                text-center
              ">

                <h3 className="text-4xl">
                  🏊
                </h3>

                <p className="
                  mt-3
                  font-semibold
                ">
                  Swimming Pool
                </p>

              </div>

              <div className="
                bg-white
                rounded-3xl
                p-6
                shadow-lg
                text-center
              ">

                <h3 className="text-4xl">
                  🚗
                </h3>

                <p className="
                  mt-3
                  font-semibold
                ">
                  Parking Area
                </p>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="
              flex
              flex-wrap
              gap-5
              mt-10
            ">

              <button
                onClick={handleBooking}
                className="
                  bg-gradient-to-r
                  from-green-500
                  to-emerald-600
                  text-white
                  px-10
                  py-4
                  rounded-2xl
                  text-lg
                  font-semibold
                  shadow-xl
                  hover:scale-105
                  transition
                "
              >
                🏡 Book Now
              </button>

              <button
                onClick={handleFavorite}
                className="
                  bg-gradient-to-r
                  from-pink-500
                  to-rose-500
                  text-white
                  px-10
                  py-4
                  rounded-2xl
                  text-lg
                  font-semibold
                  shadow-xl
                  hover:scale-105
                  transition
                "
              >
                ❤️ Favourite
              </button>

            </div>

            {/* BOOKING SUCCESS CARD */}

            {

              bookingSuccess && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mt-10
                    bg-green-50
                    border
                    border-green-200
                    rounded-3xl
                    p-8
                    shadow-xl
                  "
                >

                  <h3 className="
                    text-3xl
                    font-bold
                    text-green-700
                  ">
                    Booking Confirmed ✅
                  </h3>

                  <p className="
                    mt-4
                    text-gray-700
                    leading-8
                  ">

                    Your booking request for

                    <span className="
                      font-bold
                    ">
                      {" "}
                      {property.title}
                    </span>

                    {" "}
                    has been submitted successfully.

                  </p>

                  <div className="
                    mt-6
                    bg-white
                    rounded-2xl
                    p-5
                    shadow-md
                  ">

                    <p className="text-lg">
                      📍 {property.location}
                    </p>

                    <p className="
                      text-lg
                      mt-3
                      font-semibold
                      text-blue-600
                    ">
                      💰 ₹ {property.price}
                    </p>

                  </div>

                </motion.div>

              )

            }

          </div>

        </motion.div>

      </div>

      {/* BACK BUTTON */}

      <div className="
        fixed
        bottom-6
        right-6
        z-50
      ">

        <button
          onClick={() =>
            window.history.back()
          }
          className="
            bg-black
            text-white
            px-6
            py-3
            rounded-2xl
            shadow-2xl
            hover:scale-105
            hover:bg-gray-800
            transition
          "
        >
          ← Back
        </button>

      </div>

    </div>

  );

}