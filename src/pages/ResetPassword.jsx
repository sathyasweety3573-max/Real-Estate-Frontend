import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  LockKeyhole,
  Home,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid reset link");
      return;
    }

    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(`/auth/reset-password/${token}`, {
        password,
      });

      toast.success(res.data.message || "Password reset successful ✅");

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Password reset failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-[35px] shadow-2xl border border-white/40 p-10"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center shadow-xl">
            <Home size={38} className="text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-center mt-6 text-gray-800">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mt-3 text-lg">
          Create your new password
        </p>

        <form onSubmit={handleResetPassword} className="mt-10">
          <div className="relative mb-5">
            <LockKeyhole
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative mb-3">
            <LockKeyhole
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <p className="text-xs text-gray-500 mb-7 leading-5">
            Password must contain 8+ characters, uppercase, lowercase, number
            and special character. Example: Sathya@123
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-2xl text-lg font-bold shadow-xl hover:scale-[1.02] transition duration-300 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
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