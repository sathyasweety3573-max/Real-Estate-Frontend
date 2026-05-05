import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

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

// ✅ NEW PAGES
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const isLoggedIn = user && token;

  return (
    <BrowserRouter>

      {/* TOAST CONFIG */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111827",
            color: "#fff",
            borderRadius: "16px",
            padding: "16px",
            fontSize: "15px",
          },
        }}
      />

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={
            isLoggedIn
              ? <Home />
              : <Navigate to="/login" replace />
          }
        />

        {/* ================= AUTH ================= */}

        <Route
          path="/login"
          element={
            isLoggedIn
              ? <Navigate to="/" replace />
              : <Login />
          }
        />

        <Route
          path="/register"
          element={
            isLoggedIn
              ? <Navigate to="/" replace />
              : <Register />
          }
        />

        {/* FORGOT PASSWORD */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* ================= MAIN ================= */}

        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ================= NEW PAGES ================= */}

        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/add-property"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
              <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
                <h1 className="text-6xl font-extrabold text-red-500">
                  404
                </h1>

                <p className="mt-4 text-gray-600 text-lg">
                  Page not found
                </p>
              </div>
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}