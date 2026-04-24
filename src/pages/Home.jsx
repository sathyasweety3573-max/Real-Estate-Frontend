import { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import API from "../services/api";
import leftHouse from "../assets/house-left.png";
import rightHouse from "../assets/house-right.png";

export default function Home() {

  // Toggle Login/Register
  const [showRegister, setShowRegister] = useState(false);

  // Password show/hide
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    mobile: "",
  });

  // Login form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // ================= REGISTER =================

  const handleRegister = async () => {

    // validation
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.location ||
      !form.mobile
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      // API CALL
      const res = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        location: form.location,
        mobile: form.mobile,
      });

      console.log("REGISTER SUCCESS:", res.data);

      alert("Registration Successful! Please Login");

      // clear form
      setForm({
        name: "",
        email: "",
        password: "",
        location: "",
        mobile: "",
      });

      // switch to login
      setShowRegister(false);

    } catch (err) {

      console.log("REGISTER ERROR:", err.response?.data);

      // IMPORTANT FIX
      const message = JSON.stringify(
        err.response?.data || ""
      );

      // duplicate email check
      if (
        message.includes("E11000") ||
        message.includes("duplicate") ||
        message.includes("already")
      ) {

        alert("Email already registered! Please Login");

        setShowRegister(false);

      } else {

        alert("Registration Failed");
      }
    }
  };

  // ================= LOGIN =================

  const handleLogin = async () => {

    // validation
    if (
      !loginData.email ||
      !loginData.password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      // API CALL
      const res = await API.post("/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });

      console.log("LOGIN SUCCESS:", res.data);

      // save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Login Successful");

    } catch (err) {

      console.log("LOGIN ERROR:", err.response?.data);

      const message = JSON.stringify(
        err.response?.data || ""
      );

      // user not registered
      if (
        message.includes("not found") ||
        message.includes("Invalid") ||
        message.includes("invalid")
      ) {

        alert("Please register first");

        setShowRegister(true);

      } else {

        alert("Login Failed");
      }
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-purple-100 overflow-hidden relative">

      <Navbar />

      {/* LEFT IMAGE */}
      <img
        src={leftHouse}
        alt=""
        className="absolute left-6 top-[420px] w-72 h-56 object-cover rounded-3xl shadow-2xl opacity-80"
      />

      {/* RIGHT IMAGE */}
      <img
        src={rightHouse}
        alt=""
        className="absolute right-13 top-[270px] w-72 h-56 object-cover rounded-3xl shadow-2xl opacity-80"
      />

      {/* HERO */}
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
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
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
              {/* NAME */}
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                className="border p-3 w-full mb-3 rounded"
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                className="border p-3 w-full mb-3 rounded"
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />

              {/* PASSWORD */}
              <div className="relative mb-3">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Password"
                  value={form.password}
                  className="border p-3 w-full rounded"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-3 text-sm text-blue-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              {/* LOCATION */}
              <textarea
                placeholder="Current Location"
                value={form.location}
                className="border p-3 w-full mb-3 rounded"
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
              />

              {/* MOBILE */}
              <input
                type="text"
                placeholder="Mobile Number"
                value={form.mobile}
                className="border p-3 w-full mb-4 rounded"
                onChange={(e) =>
                  setForm({
                    ...form,
                    mobile: e.target.value,
                  })
                }
              />

              {/* REGISTER BUTTON */}
              <button
                type="button"
                onClick={handleRegister}
                className="bg-green-500 text-white w-full py-3 rounded-lg hover:bg-green-600 transition"
              >
                Register
              </button>
            </>

          ) : (

            <>
              {/* LOGIN EMAIL */}
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                className="border p-3 w-full mb-3 rounded"
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
              />

              {/* LOGIN PASSWORD */}
              <div className="relative mb-4">

                <input
                  type={
                    showLoginPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Password"
                  value={loginData.password}
                  className="border p-3 w-full rounded"
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      password: e.target.value,
                    })
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowLoginPassword(
                      !showLoginPassword
                    )
                  }
                  className="absolute right-3 top-3 text-sm text-blue-500"
                >
                  {showLoginPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="button"
                onClick={handleLogin}
                className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </button>
            </>
          )}

        </motion.div>

      </div>

    </div>
  );
}