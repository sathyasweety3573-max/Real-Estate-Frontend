import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import API from "../services/api";
import toast from "react-hot-toast";

import leftHouse from "../assets/house-left.png";
import rightHouse from "../assets/house-right.png";

export default function Home() {

  const navigate = useNavigate();

  // ✅ CHECK USER LOGIN

  const isLoggedIn = localStorage.getItem("user");

  // 🔥 LOGIN DEFAULT

  const [showRegister, setShowRegister] = useState(false);

  // 👁 PASSWORD TOGGLE

  const [showPassword, setShowPassword] = useState(false);

  const [showLoginPassword, setShowLoginPassword] =
    useState(false);

  // 📝 REGISTER FORM

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    mobile: "",
  });

  // 🔐 LOGIN FORM

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // ================= REGISTER =================

  const handleRegister = async () => {

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.location ||
      !form.mobile
    ) {

      toast.error("Please fill all fields");

      return;
    }

    try {

      await API.post("/auth/register", form);

      toast.success(
        "Registration Successful ✅"
      );

      // CLEAR FORM

      setForm({
        name: "",
        email: "",
        password: "",
        location: "",
        mobile: "",
      });

      // BACK TO LOGIN

      setShowRegister(false);

    } catch (err) {

      const message = JSON.stringify(
        err.response?.data || ""
      );

      if (
        message.includes("already") ||
        message.includes("duplicate")
      ) {

        toast.error(
          "User already exists. Please Login"
        );

        setShowRegister(false);

      } else {

        toast.error(
          "Registration Failed ❌"
        );
      }
    }
  };

  // ================= LOGIN =================

  const handleLogin = async () => {

    if (
      !loginData.email ||
      !loginData.password
    ) {

      toast.error("Please fill all fields");

      return;
    }

    try {

      const res = await API.post(
        "/auth/login",
        loginData
      );

      // SAVE USER

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      toast.success("Login Successful ✅");

      // RELOAD PAGE

      navigate("/");

      setTimeout(() => {
        window.location.reload();
      }, 500);

    } catch (err) {

      const message = JSON.stringify(
        err.response?.data || ""
      );

      if (
        message.includes("Invalid") ||
        message.includes("not found")
      ) {

        toast.error(
          "New User? Please create account first"
        );

      } else {

        toast.error("Login Failed ❌");
      }
    }
  };

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-blue-50
      to-purple-100
      overflow-hidden
      relative
    ">

      {/* ✅ SHOW NAVBAR ONLY AFTER LOGIN */}

      {isLoggedIn && <Navbar />}

      {/* HERO SECTION */}

      <section className="
        max-w-7xl
        mx-auto
        min-h-screen
        flex
        items-center
        justify-center
        px-6
        py-10
      ">

        <div className="
          grid
          lg:grid-cols-2
          gap-16
          items-center
          w-full
        ">

          {/* LEFT SIDE */}

          <div>

            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                text-5xl
                lg:text-7xl
                font-extrabold
                leading-tight
                text-gray-900
              "
            >

              Unlock Your

              <span className="text-blue-600">
                {" "}Dream Home
              </span>

              {" "}🏡

            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                text-gray-600
                text-lg
                mt-6
                leading-relaxed
                max-w-xl
              "
            >

              Buy • Rent • Explore luxury
              properties with modern living
              and premium comfort.

            </motion.p>

            {/* LOGIN / REGISTER CARD */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                mt-10
                bg-white/70
                backdrop-blur-xl
                shadow-2xl
                border border-white/30
                rounded-3xl
                p-8
                w-full
                max-w-md
              "
            >

              <h2 className="
                text-3xl
                font-bold
                text-gray-800
                mb-6
              ">

                {showRegister
                  ? "Create Account ✨"
                  : "Welcome Back 👋"}

              </h2>

              {/* REGISTER */}

              {showRegister ? (

                <>

                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    className="
                      border
                      p-3
                      w-full
                      mb-3
                      rounded-xl
                    "
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    className="
                      border
                      p-3
                      w-full
                      mb-3
                      rounded-xl
                    "
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
                      className="
                        border
                        p-3
                        w-full
                        rounded-xl
                      "
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password:
                            e.target.value,
                        })
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="
                        absolute
                        right-4
                        top-3
                        text-blue-500
                        text-sm
                        cursor-pointer
                      "
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                  <textarea
                    placeholder="Location"
                    value={form.location}
                    className="
                      border
                      p-3
                      w-full
                      mb-3
                      rounded-xl
                    "
                    onChange={(e) =>
                      setForm({
                        ...form,
                        location:
                          e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={form.mobile}
                    className="
                      border
                      p-3
                      w-full
                      mb-4
                      rounded-xl
                    "
                    onChange={(e) =>
                      setForm({
                        ...form,
                        mobile:
                          e.target.value,
                      })
                    }
                  />

                  <button
                    onClick={handleRegister}
                    className="
                      w-full
                      bg-gradient-to-r
                      from-green-500
                      to-emerald-600
                      text-white
                      py-3
                      rounded-xl
                      font-semibold
                      hover:scale-[1.02]
                      transition
                      cursor-pointer
                    "
                  >
                    Register
                  </button>

                  <p className="
                    text-center
                    text-sm
                    text-gray-600
                    mt-5
                  ">

                    Already have account?

                    <span
                      onClick={() =>
                        setShowRegister(false)
                      }
                      className="
                        text-blue-600
                        font-semibold
                        ml-2
                        cursor-pointer
                        hover:underline
                      "
                    >
                      Login
                    </span>

                  </p>

                </>

              ) : (

                <>

                  {/* LOGIN EMAIL */}

                  <input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    className="
                      border
                      p-3
                      w-full
                      mb-3
                      rounded-xl
                    "
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        email:
                          e.target.value,
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
                      value={
                        loginData.password
                      }
                      className="
                        border
                        p-3
                        w-full
                        rounded-xl
                      "
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password:
                            e.target.value,
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
                      className="
                        absolute
                        right-4
                        top-3
                        text-blue-500
                        text-sm
                        cursor-pointer
                      "
                    >
                      {showLoginPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                  {/* LOGIN BUTTON */}

                  <button
                    onClick={handleLogin}
                    className="
                      w-full
                      bg-gradient-to-r
                      from-blue-600
                      to-purple-600
                      text-white
                      py-3
                      rounded-xl
                      font-semibold
                      hover:scale-[1.02]
                      transition
                      shadow-lg
                      cursor-pointer
                    "
                  >
                    Login
                  </button>

                  {/* REGISTER LINK */}

                  <p className="
                    text-center
                    text-sm
                    text-gray-600
                    mt-5
                  ">

                    New User?

                    <span
                      onClick={() =>
                        setShowRegister(true)
                      }
                      className="
                        text-blue-600
                        font-semibold
                        ml-2
                        cursor-pointer
                        hover:underline
                        cursor-pointer
                      "
                    >
                      Create Account
                    </span>

                  </p>

                </>

              )}

            </motion.div>

          </div>

          {/* RIGHT SIDE IMAGES */}

          <div className="
            relative
            flex
            justify-center
            items-center
          ">

            <img
              src={rightHouse}
              alt="Luxury Home"
              className="
                w-[500px]
                rounded-[40px]
                shadow-2xl
                object-cover
              "
            />

            <img
              src={leftHouse}
              alt="Modern House"
              className="
                absolute
                -bottom-12
                -left-10
                w-72
                rounded-3xl
                border-4 border-white
                shadow-2xl
              "
            />

            <div className="
              absolute
              top-8
              -right-6
              bg-white
              shadow-xl
              rounded-2xl
              px-6
              py-4
            ">

              <h3 className="
                text-3xl
                font-bold
                text-blue-600
              ">
                500+
              </h3>

              <p className="
                text-gray-500
                text-sm
              ">
                Premium Properties
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}