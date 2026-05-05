import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProtectedRoute({
  children,
  adminOnly = false,
}) {
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const notLoggedIn = !storedUser || !token || !user;
  const notAdmin = adminOnly && user?.user?.role !== "admin";

  useEffect(() => {
    if (notLoggedIn) {
      toast.error("Please login first 🔒");
    } else if (notAdmin) {
      toast.error("Only Admin Can Access 🚫");
    }
  }, [notLoggedIn, notAdmin]);

  if (notLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (notAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}