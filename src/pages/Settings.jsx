import { useState } from "react";

import Navbar from "../components/Navbar";

import {
  User,
  Mail,
  Shield,
  Lock,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";

import toast from "react-hot-toast";

export default function Settings() {

  const storedUser =
    JSON.parse(localStorage.getItem("user"));

  const user =
    storedUser?.user || storedUser;

  const [showPassword, setShowPassword] =
    useState(false);

  const [passwords, setPasswords] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const handlePasswordChange = () => {

    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      toast.error(
        "Please fill all password fields"
      );

      return;
    }

    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );

      return;
    }

    toast.success(
      "Password changed successfully ✅"
    );

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleRateUs = (rating) => {

    toast.success(
      `Thanks for rating us ${rating}⭐`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">

      <Navbar />

      <div className="max-w-6xl mx-auto px-5 py-12">

        {/* PAGE TITLE */}

        <div className="mb-10">

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Settings ⚙️
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Manage your account, security,
            and preferences.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* PROFILE CARD */}

          <div className="bg-white/80 backdrop-blur-xl rounded-[35px] shadow-2xl p-8 border border-white/40">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">

                {user?.name?.charAt(0)?.toUpperCase() || "U"}

              </div>

              <div>

                <h2 className="text-3xl font-bold text-gray-800">
                  {user?.name || "User"}
                </h2>

                <p className="text-gray-500 mt-1">
                  Premium Customer
                </p>

              </div>

            </div>

            <div className="space-y-6">

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="flex items-center gap-3 text-blue-600 font-bold">

                  <User size={20} />

                  Full Name

                </div>

                <p className="mt-3 text-gray-700 text-lg">
                  {user?.name || "Not Available"}
                </p>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="flex items-center gap-3 text-pink-600 font-bold">

                  <Mail size={20} />

                  Email Address

                </div>

                <p className="mt-3 text-gray-700 text-lg break-all">
                  {user?.email || "Not Available"}
                </p>

              </div>

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="flex items-center gap-3 text-green-600 font-bold">

                  <Shield size={20} />

                  Account Status

                </div>

                <p className="mt-3 text-gray-700 text-lg">
                  Verified Account ✅
                </p>

              </div>

            </div>

          </div>

          {/* SECURITY */}

          <div className="bg-white/80 backdrop-blur-xl rounded-[35px] shadow-2xl p-8 border border-white/40">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Security 🔒
            </h2>

            <div className="space-y-5">

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Current Password"
                  value={
                    passwords.currentPassword
                  }
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      currentPassword:
                        e.target.value,
                    })
                  }
                  className="w-full p-5 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="New Password"
                  value={
                    passwords.newPassword
                  }
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      newPassword:
                        e.target.value,
                    })
                  }
                  className="w-full p-5 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm Password"
                  value={
                    passwords.confirmPassword
                  }
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      confirmPassword:
                        e.target.value,
                    })
                  }
                  className="w-full p-5 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-5 top-5 text-gray-500 cursor-pointer"
                >
                  {showPassword
                    ? <EyeOff size={20} />
                    : <Eye size={20} />}
                </button>

              </div>

              <button
                onClick={
                  handlePasswordChange
                }
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:scale-[1.02] transition cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2">

                  <Lock size={20} />

                  Change Password

                </div>
              </button>

            </div>

            {/* RATE US */}

            <div className="mt-12">

              <h3 className="text-2xl font-bold text-gray-800 mb-5">
                Rate Us ⭐
              </h3>

              <div className="flex gap-3">

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <button
                      key={star}
                      onClick={() =>
                        handleRateUs(star)
                      }
                      className="bg-yellow-100 hover:bg-yellow-300 p-4 rounded-2xl transition cursor-pointer"
                    >
                      <Star
                        className="text-yellow-500"
                        fill="currentColor"
                      />
                    </button>
                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}