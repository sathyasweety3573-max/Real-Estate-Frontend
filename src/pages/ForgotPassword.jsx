import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Home, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/forgot-password", {
        email: cleanEmail,
      });

      toast.success(res.data.message || "Reset link sent to your email ✅");

      setEmail("");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to send reset link ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-[35px] shadow-2xl border border-white/40 p-10"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
            <Home size={38} className="text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-center mt-6 text-gray-800">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mt-3 text-lg">
          Enter your email to receive reset link
        </p>

        <form onSubmit={handleForgotPassword} className="mt-10">
          <div className="relative mb-6">
            <Mail
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="email"
              placeholder="Enter registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl text-lg font-bold shadow-xl hover:scale-[1.02] transition duration-300 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}