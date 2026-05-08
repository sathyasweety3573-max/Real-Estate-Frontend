import axios from "axios";

const API = axios.create({
  baseURL: "https://real-estate-backend-ollv.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    const isAuthPublicRoute =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/forgot-password") ||
      requestUrl.includes("/auth/verify-reset-token") ||
      requestUrl.includes("/auth/reset-password");

    if (status === 401 && !isAuthPublicRoute) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;