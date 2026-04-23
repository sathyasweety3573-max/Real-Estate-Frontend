import { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import API from "../services/api";
import leftHouse from "../assets/house-left.png";
import rightHouse from "../assets/house-right.png";

export default function Home() {
  const [showRegister, setShowRegister] = useState(false);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-purple-100 overflow-hidden relative">
      <Navbar />

      <img
  src={leftHouse}
  alt=""
  className="
    absolute
    left-6
    top-[420px]
    w-72
    h-56
    object-cover
    rounded-3xl
    shadow-2xl
    opacity-80
  "
/>

<img
  src={rightHouse}
  alt=""
  className="
    absolute
    right-13
    top-[270px]
    w-72
    h-56
    object-cover
    rounded-3xl
    shadow-2xl
    opacity-80
  "/>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-20">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-5xl font-bold mb-6"
        >
          Unlock the Door to Your Dream Home 🏡
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 text-lg mb-10"
        >
          Buy • Rent • Explore premium properties easily
        </motion.p>

        {/* BUTTONS */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => setShowRegister(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            Login
          </button>

          <button
            onClick={() => setShowRegister(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            Register
          </button>
        </div>

        {/* FORM CARD */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-sm"
        >
          {showRegister ? (
            <>
              <input
                placeholder="Name"
                className="border p-2 w-full mb-3 rounded"
              />
              <input
                placeholder="Email"
                className="border p-2 w-full mb-3 rounded"
              />
              <input
                placeholder="Password"
                className="border p-2 w-full mb-4 rounded"
              />
              <select className="w-full p-3 rounded-xl border mb-4">

  <option>Male</option>

  <option>Female</option>

</select>

<input
  type="date"
  className="w-full p-3 rounded-xl border mb-4"
/>

<input
  placeholder="Country"
  className="w-full p-3 rounded-xl border mb-4"
/>

<input
  placeholder="State"
  className="w-full p-3 rounded-xl border mb-4"
/>

<input
  placeholder="District"
  className="w-full p-3 rounded-xl border mb-4"
/>

<textarea
  placeholder="Current Address"
  className="w-full p-3 rounded-xl border mb-4"
/>

<input
  placeholder="Mobile Number"
  className="w-full p-3 rounded-xl border mb-4"
/>

              <button className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600 transition">
                Register
              </button>
            </>
          ) : (
            <>
              <input
                placeholder="Email"
                className="border p-2 w-full mb-3 rounded"
              />
              <input
                placeholder="Password"
                className="border p-2 w-full mb-4 rounded"
              />

              <button className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition">
                Login
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}