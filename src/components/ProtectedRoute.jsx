import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProtectedRoute({
  children,
  adminOnly = false,
}) {

  const storedUser =
    localStorage.getItem("user");

  const token =
    localStorage.getItem("token");

  let parsedUser = null;

  try {

    parsedUser =
      storedUser
        ? JSON.parse(storedUser)
        : null;

  } catch (error) {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    parsedUser = null;
  }

  // SUPPORT BOTH STRUCTURES
  // { role: "admin" }
  // { user: { role: "admin" } }

  const user =
    parsedUser?.user || parsedUser;

  const notLoggedIn =
    !user || !token;

  const notAdmin =
    adminOnly &&
    user?.role !== "admin";

  // ONLY ADMIN ERROR TOAST
  useEffect(() => {

    if (notAdmin) {

      toast.error(
        "Only Admin Can Access 🚫"
      );

    }

  }, [notAdmin]);

  // NOT LOGGED IN
  if (notLoggedIn) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // NOT ADMIN
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