import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";

export default function About() {

  /* REVIEWS */

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
  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState("★★★★★");

  /* ADD REVIEW */

  const addReview = () => {

    if (!name || !reviewText) {
      return alert("Please fill all fields 👶");
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
      bg-gradient-to-br
      from-slate-100
      via-blue-50
      to-purple-100
    ">

      <Navbar />

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-16
      ">

        {/* HERO SECTION */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            text-center
            bg-white/60
            backdrop-blur-xl
            rounded-[40px]
            shadow-2xl
            p-12
            border
            border-white/40
          "
        >

          <h1 className="
            text-3xl
            md:text-5xl
            font-extrabold
            text-gray-800
            leading-tight
          ">
            About
            <span className="text-blue-600">
              {" "}Lidharshana Homez
            </span>
            {" "}🏡
          </h1>

          <p className="
            mt-8
            text-xl
            text-gray-600
            max-w-3xl
            mx-auto
            leading-9
          ">
            We help families discover luxury villas,
            premium apartments, and dream homes
            with trust, comfort, and happiness.
          </p>

          {/* STATS */}

          <div className="
            grid
            md:grid-cols-3
            gap-8
            mt-14
          ">

            <div className="
              bg-white
              rounded-3xl
              p-8
              shadow-xl
            ">
              <h2 className="
                text-5xl
                font-bold
                text-blue-600
              ">
                500+
              </h2>

              <p className="
                mt-3
                text-gray-600
                text-lg
              ">
                Premium Properties
              </p>
            </div>

            <div className="
              bg-white
              rounded-3xl
              p-8
              shadow-xl
            ">
              <h2 className="
                text-5xl
                font-bold
                text-pink-600
              ">
                1200+
              </h2>

              <p className="
                mt-3
                text-gray-600
                text-lg
              ">
                Happy Clients
              </p>
            </div>

            <div className="
              bg-white
              rounded-3xl
              p-8
              shadow-xl
            ">
              <h2 className="
                text-5xl
                font-bold
                text-green-600
              ">
                10+
              </h2>

              <p className="
                mt-3
                text-gray-600
                text-lg
              ">
                Years Experience
              </p>
            </div>

          </div>

        </motion.div>

        {/* AGENTS SECTION */}

        <div className="mt-24">

          <h2 className="
            text-5xl
            font-bold
            text-center
            text-gray-800
          ">
            Meet Our Expert Agents 👨‍💼
          </h2>

          <p className="
            text-center
            text-gray-600
            mt-5
            text-lg
          ">
            Professional guidance from trusted experts
          </p>

          <div className="
            grid
            md:grid-cols-3
            gap-10
            mt-14
          ">

            {[
              {
                name: "Daniel Raj",
                role: "Luxury Villa Specialist",
              },

              {
                name: "Priya Sharma",
                role: "Apartment Consultant",
              },

              {
                name: "Karthik Dev",
                role: "Property Investment Expert",
              },

            ].map((agent, index) => (

              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                }}
                className="
                  bg-white/70
                  backdrop-blur-xl
                  rounded-[35px]
                  shadow-2xl
                  p-10
                  text-center
                  border
                  border-white/40
                "
              >

                <div className="
                  w-28
                  h-28
                  rounded-full
                  bg-gradient-to-r
                  from-blue-500
                  to-purple-600
                  flex
                  items-center
                  justify-center
                  text-4xl
                  mx-auto
                  text-white
                  shadow-xl
                ">
                  👤
                </div>

                <h3 className="
                  text-2xl
                  font-bold
                  mt-6
                  text-gray-800
                ">
                  {agent.name}
                </h3>

                <p className="
                  text-blue-600
                  mt-3
                  font-medium
                ">
                  {agent.role}
                </p>

                <p className="
                  text-gray-500
                  mt-5
                  leading-7
                ">
                  Helping families find beautiful
                  dream homes with trust and care.
                </p>

              </motion.div>

            ))}

          </div>

        </div>

        {/* REVIEWS SECTION */}

        <div className="mt-24">

          <h2 className="
            text-5xl
            font-bold
            text-center
            text-pink-600
          ">
            What Our Customers Say ❤️
          </h2>

          <div className="
            grid
            md:grid-cols-2
            gap-10
            mt-14
          ">

            {allReviews.map((item, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                }}
                className="
                  bg-white/70
                  backdrop-blur-xl
                  rounded-[35px]
                  shadow-2xl
                  p-10
                  border
                  border-white/40
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <h3 className="
                    text-2xl
                    font-bold
                    text-gray-800
                  ">
                    {item.name}
                  </h3>

                  <span className="
                    text-yellow-500
                    text-2xl
                  ">
                    {item.stars}
                  </span>

                </div>

                <p className="
                  text-gray-600
                  mt-6
                  leading-8
                  text-lg
                ">
                  "{item.review}"
                </p>

              </motion.div>

            ))}

          </div>

        </div>

        {/* REVIEW FORM */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            mt-24
            bg-white/70
            backdrop-blur-xl
            rounded-[40px]
            shadow-2xl
            p-10
            border
            border-white/40
          "
        >

          <h2 className="
            text-5xl
            font-bold
            text-center
            text-blue-700
          ">
            Share Your Experience ✨
          </h2>

          <p className="
            text-center
            text-gray-500
            mt-4
          ">
            Your feedback helps us grow better
          </p>

          <div className="
            mt-12
            space-y-6
            max-w-3xl
            mx-auto
          ">

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
                w-full
                p-5
                rounded-2xl
                border
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <textarea
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) =>
                setReviewText(
                  e.target.value
                )
              }
              rows="5"
              className="
                w-full
                p-5
                rounded-2xl
                border
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <select
              value={stars}
              onChange={(e) =>
                setStars(e.target.value)
              }
              className="
                w-full
                p-5
                rounded-2xl
                border
                outline-none
              "
            >
              <option>★★★★★</option>
              <option>★★★★☆</option>
              <option>★★★☆☆</option>
              <option>★★☆☆☆</option>
              <option>★☆☆☆☆</option>
            </select>

            <button
              onClick={addReview}
              className="
                w-full
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                text-white
                py-5
                rounded-2xl
                text-xl
                font-bold
                hover:scale-[1.02]
                transition
                shadow-xl
              "
            >
              Submit Review 🚀
            </button>

          </div>

        </motion.div>

      </div>

    </div>

  );
}