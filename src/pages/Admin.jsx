import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Admin() {

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-gray-100
      to-blue-100
      pt-32
    ">

      <Navbar />

      <div className="
        max-w-6xl
        mx-auto
        px-6
      ">

        <h1 className="
          text-6xl
          font-bold
          text-center
          mb-16
        ">
          Admin Dashboard ⚡
        </h1>

        <div className="
          grid
          md:grid-cols-3
          gap-10
        ">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="
              bg-white
              p-10
              rounded-3xl
              shadow-2xl
              text-center
            "
          >

            <h2 className="text-5xl font-bold text-blue-600">
              120
            </h2>

            <p className="mt-4 text-xl">
              Total Properties
            </p>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="
              bg-white
              p-10
              rounded-3xl
              shadow-2xl
              text-center
            "
          >

            <h2 className="text-5xl font-bold text-green-600">
              58
            </h2>

            <p className="mt-4 text-xl">
              Bookings
            </p>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="
              bg-white
              p-10
              rounded-3xl
              shadow-2xl
              text-center
            "
          >

            <h2 className="text-5xl font-bold text-pink-600">
              240
            </h2>

            <p className="mt-4 text-xl">
              Users
            </p>

          </motion.div>

        </div>

      </div>

    </div>

  );

}