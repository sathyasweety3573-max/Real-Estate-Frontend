import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";

export default function About() {

  /* DEFAULT REVIEWS */

  const [allReviews, setAllReviews] = useState([
    {
      name: "Arjun",
      review: "Found my dream villa very easily!",
      stars: "★★★★★",
    },
    {
      name: "Priya",
      review: "Amazing support and premium properties.",
      stars: "★★★★★",
    },
    {
      name: "Rahul",
      review: "Best real estate platform I used.",
      stars: "★★★★★",
    },
    {
      name: "Sneha",
      review: "Smooth booking experience and great agents.",
      stars: "★★★★★",
    },
    {
      name: "Karthik",
      review: "Luxury homes with affordable pricing.",
      stars: "★★★★★",
    },
  ]);

  /* INPUT STATES */

  const [name, setName] = useState("");

  const [reviewText, setReviewText] =
    useState("");

  const [stars, setStars] =
    useState("★★★★★");

  /* ADD REVIEW FUNCTION */

  const addReview = () => {

    if (!name || !reviewText) {

      return alert(
        "Please fill all fields 👶"
      );

    }

    const newReview = {

      name,

      review: reviewText,

      stars,

    };

    setAllReviews([
      newReview,
      ...allReviews,
    ]);

    setName("");

    setReviewText("");

    setStars("★★★★★");

  };

  return (

    <div className="
      min-h-screen
      bg-gradient-to-r
      from-blue-50
      to-purple-100
    ">

      <Navbar />

      <div className="
        max-w-6xl
        mx-auto
        px-6
        py-16
      ">

        {/* TITLE */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >

          <h1 className="
            text-5xl
            font-bold
            text-gray-800
          ">
            About Lidharshana Homez 🏡
          </h1>

          <p className="
            mt-6
            text-xl
            text-gray-600
          ">
            Find luxury homes with comfort,
            trust, and happiness.
          </p>

          <p className="
            mt-2
            text-lg
            text-gray-500
          ">
            We help families discover
            beautiful dream homes easily.
          </p>

        </motion.div>

        {/* AGENTS SECTION */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="
            mt-20
            bg-white
            rounded-3xl
            shadow-2xl
            p-10
          "
        >

          <h2 className="
            text-4xl
            font-bold
            text-center
            text-blue-700
          ">
            Our Expert Agents 👨‍💼
          </h2>

          <p className="
            text-center
            text-gray-600
            mt-6
            text-lg
            leading-8
          ">
            Our professional real estate
            agents help customers find
            premium homes, luxury villas,
            and modern apartments with
            trusted guidance and friendly
            support.
          </p>

          <p className="
            text-center
            text-gray-500
            mt-4
          ">
            We believe every family
            deserves a perfect dream home.
          </p>

        </motion.div>

        {/* CUSTOMER REVIEWS */}

        <div className="mt-20">

          <h2 className="
            text-4xl
            font-bold
            text-center
            text-pink-600
          ">
            Customer Reviews ❤️
          </h2>

          <div className="
            grid
            md:grid-cols-2
            gap-8
            mt-12
          ">

            {allReviews.map(
              (item, index) => (

              <motion.div
                key={index}
                whileHover={{
                  scale: 1.03,
                }}
                className="
                  bg-white
                  rounded-3xl
                  shadow-xl
                  p-8
                "
              >

                <h3 className="
                  text-2xl
                  font-bold
                  text-gray-800
                ">
                  {item.name}
                </h3>

                <p className="
                  text-gray-600
                  mt-4
                ">
                  "{item.review}"
                </p>

                <p className="
                  text-yellow-500
                  text-2xl
                  mt-4
                ">
                  {item.stars}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

        {/* ADD REVIEW SECTION */}

        <div className="
          mt-20
          bg-white
          rounded-3xl
          shadow-2xl
          p-10
        ">

          <h2 className="
            text-4xl
            font-bold
            text-center
            text-blue-700
          ">
            Add Your Review ✨
          </h2>

          <div className="
            mt-10
            space-y-5
          ">

            {/* NAME */}

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
                w-full
                p-4
                rounded-2xl
                border
                outline-none
              "
            />

            {/* REVIEW */}

            <input
              type="text"
              placeholder="Write short review..."
              value={reviewText}
              onChange={(e) =>
                setReviewText(
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-2xl
                border
                outline-none
              "
            />

            {/* STARS */}

            <select
              value={stars}
              onChange={(e) =>
                setStars(e.target.value)
              }
              className="
                w-full
                p-4
                rounded-2xl
                border
              "
            >

              <option>
                ★★★★★
              </option>

              <option>
                ★★★★☆
              </option>

              <option>
                ★★★☆☆
              </option>

              <option>
                ★★☆☆☆
              </option>

              <option>
                ★☆☆☆☆
              </option>

            </select>

            {/* BUTTON */}

            <button
              onClick={addReview}
              className="
                w-full
                bg-blue-600
                text-white
                py-4
                rounded-2xl
                text-xl
                font-bold
                hover:bg-blue-700
                transition
              "
            >
              Submit Review 🚀
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}