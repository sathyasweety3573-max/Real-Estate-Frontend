import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  LockKeyhole,
  Home,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password } = form;

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPassword.test(password)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number & special character"
      );
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      toast.success("Registration Successful ✅");

      setForm({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Registration Failed ❌";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-green-50 to-blue-100 px-4">
      <div className="absolute w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-20 top-10 left-10"></div>

      <div className="absolute w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-[35px] shadow-2xl border p-10"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-xl">
            <Home size={38} className="text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-center mt-6 text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-3 text-lg">
          Register to continue
        </p>

        <form onSubmit={handleRegister} className="mt-10">
          <div className="relative mb-5">
            <User
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full pl-12 pr-4 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative mb-5">
            <Mail
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full pl-12 pr-4 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative mb-3">
            <LockKeyhole
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full pl-12 pr-12 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <p className="text-xs text-gray-500 mb-8 leading-5">
            Password must contain 8+ characters, uppercase, lowercase, number
            and special character. Example: Sathya@123
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl text-lg font-bold shadow-xl disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}