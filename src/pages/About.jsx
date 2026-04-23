import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function About() {
  const reviews = [
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-gray-800">
            About Lidharshana Homez 🏡
          </h1>

          <p className="mt-6 text-xl text-gray-600">
            Find luxury homes with comfort, trust, and happiness.
          </p>

          <p className="mt-2 text-lg text-gray-500">
            We help families discover beautiful dream homes easily.
          </p>
        </motion.div>

        {/* AGENTS SECTION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-20 bg-white rounded-3xl shadow-2xl p-10"
        >
          <h2 className="text-4xl font-bold text-center text-blue-700">
            Our Expert Agents 👨‍💼
          </h2>

          <p className="text-center text-gray-600 mt-6 text-lg leading-8">
            Our professional real estate agents help customers find premium
            homes, luxury villas, and modern apartments with trusted guidance
            and friendly support.
          </p>

          <p className="text-center text-gray-500 mt-4">
            We believe every family deserves a perfect dream home.
          </p>
        </motion.div>

        {/* REVIEWS */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center text-pink-600">
            Customer Reviews ❤️
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {reviews.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-800">
                  {item.name}
                </h3>

                <p className="text-gray-600 mt-4">"{item.review}"</p>

                <p className="text-yellow-500 text-2xl mt-4">{item.stars}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
