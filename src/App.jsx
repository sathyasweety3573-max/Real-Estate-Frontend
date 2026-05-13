import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useContext } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import AddProperty from "./pages/AddProperty";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Settings from "./pages/Settings";
import MyBookings from "./pages/MyBookings";
import Favorites from "./pages/Favorites";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { loading, user } =
    useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100">
        <div className="bg-white rounded-3xl shadow-xl px-10 py-8 text-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-gray-700 font-bold">
            Loading App...
          </p>
        </div>
      </div>
    );
  }

  const loggedUser =
    user?.user || user;

  const defaultRedirect =
    loggedUser?.role === "admin"
      ? "/admin"
      : loggedUser
      ? "/home"
      : "/login";

  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT PAGE */}
        <Route
          path="/"
          element={
            <Navigate
              to={defaultRedirect}
              replace
            />
          }
        />

        {/* AUTH PAGES */}
        <Route
          path="/login"
          element={
            loggedUser ? (
              <Navigate
                to={defaultRedirect}
                replace
              />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            loggedUser ? (
              <Navigate
                to={defaultRedirect}
                replace
              />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* USER PROTECTED PAGES */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />

        <Route
          path="/property/:id"
          element={
            <ProtectedRoute>
              <PropertyDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        {/* PUBLIC PAGES */}
        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

        {/* ADMIN ONLY PAGES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-property"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddProperty />
            </ProtectedRoute>
          }
        />

        {/* WRONG URL FALLBACK */}
        <Route
          path="*"
          element={
            <Navigate
              to={defaultRedirect}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}