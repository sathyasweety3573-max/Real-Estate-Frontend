import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  adminOnly = false,
}) {
  const {
    user,
    token,
    loading,
  } = useContext(AuthContext);

  const loggedUser =
    user?.user || user;

  const notLoggedIn =
    !loggedUser || !token;

  const notAdmin =
    adminOnly &&
    loggedUser?.role !== "admin";

  useEffect(() => {
    if (!loading && notAdmin) {
      toast.error(
        "Only Admin Can Access 🚫"
      );
    }
  }, [loading, notAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100">
        <div className="bg-white rounded-3xl shadow-xl px-10 py-8 text-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-gray-700 font-bold">
            Checking Access...
          </p>
        </div>
      </div>
    );
  }

  if (notLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (notAdmin) {
    return (
      <Navigate
        to="/home"
        replace
      />
    );
  }

  return children;
}