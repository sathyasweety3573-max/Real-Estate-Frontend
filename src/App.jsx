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

import ProtectedRoute from "./components/ProtectedRoute";

import { AuthContext } from "./context/AuthContext";

export default function App() {

  const { user, token, loading } =
    useContext(AuthContext);

  const isLoggedIn = user && token;

  if (loading) {
    return null;
  }

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            isLoggedIn
              ? <Navigate to="/home" replace />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn
              ? <Navigate to="/home" replace />
              : <Login />
          }
        />

        <Route
          path="/register"
          element={
            isLoggedIn
              ? <Navigate to="/home" replace />
              : <Register />
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

      </Routes>

    </BrowserRouter>
  );
}