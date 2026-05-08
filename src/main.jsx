import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import AuthProvider from "./context/AuthContext.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
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
            success: {
              style: {
                background: "#16a34a",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#dc2626",
                color: "#fff",
              },
            },
          }}
        />

        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);