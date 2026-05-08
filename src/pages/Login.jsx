import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import {
  Home,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const { login } =
    useContext(AuthContext);

  const navigate = useNavigate();

  // CLEAR OLD VALUES
  useEffect(() => {

    setEmail("");
    setPassword("");

  }, []);

  const handleLogin = async (e) => {

    e.preventDefault();

    if (
      !email.trim() ||
      !password.trim()
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {

      setLoading(true);

      const res =
        await API.post(
          "/auth/login",
          {
            email: email.trim(),
            password,
          }
        );

      login(res.data);

      // REMEMBER ME
      if (rememberMe) {

        localStorage.setItem(
          "rememberMe",
          "true"
        );

      } else {

        localStorage.removeItem(
          "rememberMe"
        );
      }

      toast.success(
        "Login Successful ✅"
      );

      navigate("/home", {
        replace: true,
      });

    } catch (err) {

      const message =
        err.response?.data?.message ||
        "Invalid Email or Password ❌";

      toast.error(message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col">

      <div className="flex-1 px-5 py-10 flex items-center justify-center relative overflow-hidden">

        {/* BG */}

        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>

        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10 max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="hidden lg:block"
          >

            <div className="inline-flex items-center gap-3 bg-white/80 px-5 py-3 rounded-full shadow-lg">

              <Home
                className="text-blue-600"
                size={22}
              />

              <span className="font-semibold text-gray-700">
                Premium Real Estate Platform
              </span>

            </div>

            <h1 className="mt-8 text-6xl font-extrabold leading-tight text-gray-900">

              Find Your

              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

                Dream Home

              </span>

            </h1>
              <h2 className="mt-5 text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent tracking-wide drop-shadow-sm">
  ✨ Lidharshana Homez
</h2>
            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-lg">

              Login to explore luxury villas,
              modern apartments,
              premium properties,
              and secure booking options.

            </p>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-2xl rounded-[35px] shadow-2xl border p-8"
          >

            <div className="flex justify-center">

              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">

                <Home
                  size={38}
                  className="text-white"
                />

              </div>

            </div>

            <h1 className="text-4xl font-extrabold text-center mt-6 text-gray-800">

              Welcome Back

            </h1>

            <p className="text-center text-gray-500 mt-3">

              Sign in to Lidharshana Homez

            </p>

            <form
              onSubmit={handleLogin}
              autoComplete="off"
              className="mt-8"
            >

              {/* FAKE INPUTS */}

              <input
                type="text"
                name="fakeusernameremembered"
                className="hidden"
              />

              <input
                type="password"
                name="fakepasswordremembered"
                className="hidden"
              />

              {/* EMAIL */}

              <div className="relative mb-5">

                <Mail
                  size={20}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="email"
                  name="user-email"
                  autoComplete="new-email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* PASSWORD */}

              <div className="relative mb-3">

                <LockKeyhole
                  size={20}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="user-password"
                  autoComplete="new-password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-4 text-gray-500 cursor-pointer"
                >

                  {showPassword
                    ? <EyeOff size={20} />
                    : <Eye size={20} />}

                </button>

              </div>

              {/* REMEMBER + FORGOT */}

              <div className="flex items-center justify-between mt-3 mb-6">

                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 accent-blue-600"
                  />

                  <span className="text-sm text-gray-600 font-medium">
                    Remember Me
                  </span>

                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl text-lg font-bold shadow-xl disabled:opacity-50 hover:scale-[1.02] transition cursor-pointer"
              >

                {loading
                  ? "Signing In..."
                  : "Sign In"}

              </button>

            </form>

            <p className="text-center text-gray-600 mt-6">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                Sign Up
              </Link>

            </p>

          </motion.div>

        </div>

      </div>

      {/* FOOTER */}

      <footer className="bg-gray-950 text-white px-6 py-8">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="text-center md:text-left">

            <h2 className="text-2xl font-extrabold">
              🏡 Lidharshana Homez
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              Find your dream home with ease and trust.
            </p>

          </div>

          {/* SOCIAL */}

          <div className="flex gap-4">

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 w-11 h-11 rounded-full hover:bg-blue-600 transition flex items-center justify-center"
            >
              <span className="text-lg font-bold">
                f
              </span>
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 w-11 h-11 rounded-full hover:bg-pink-600 transition flex items-center justify-center"
            >
              <span className="text-lg font-bold">
                ◎
              </span>
            </a>

            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 w-11 h-11 rounded-full hover:bg-sky-500 transition flex items-center justify-center"
            >
              <span className="text-lg font-bold">
                𝕏
              </span>
            </a>

            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 w-11 h-11 rounded-full hover:bg-red-600 transition flex items-center justify-center"
            >
              <span className="text-lg font-bold">
                ▶
              </span>
            </a>

          </div>

          {/* LINKS */}

          <div className="flex gap-4 text-sm text-gray-400">

            <Link
              to="/terms"
              className="hover:text-white"
            >
              Terms
            </Link>

            <Link
              to="/privacy"
              className="hover:text-white"
            >
              Privacy
            </Link>

          </div>

        </div>

        <p className="text-center text-gray-500 text-sm mt-6">

          © {new Date().getFullYear()}
          {" "}
          Lidharshana Homez.
          All rights reserved.

        </p>

      </footer>

    </div>
  );
}