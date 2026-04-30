import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const { login } =
    useContext(AuthContext);

  const navigate = useNavigate();

  // ================= LOGIN =================

  const handleLogin = async () => {

    // VALIDATION

    if (!email || !password) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      console.log(
        "LOGIN SUCCESS:",
        res.data
      );

      // SAVE USER

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      // AUTH CONTEXT LOGIN

      login(res.data);

      toast.success(
        "Login Successful ✅"
      );

      // GO HOME PAGE

      navigate("/");

      // REFRESH PAGE FOR NAVBAR

      setTimeout(() => {
        window.location.reload();
      }, 500);

    } catch (err) {

      console.log(
        "LOGIN ERROR:",
        err.response?.data
      );

      const message =
        err.response?.data?.message ||
        "Login Failed ❌";

      toast.error(message);
    }
  };

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-blue-50
      via-white
      to-purple-100
      px-4
    ">

      <div className="
        bg-white/80
        backdrop-blur-xl
        shadow-2xl
        rounded-3xl
        p-10
        w-full
        max-w-md
        border
        border-white/40
      ">

        {/* TITLE */}

        <h1 className="
          text-4xl
          font-bold
          text-center
          mb-3
          text-gray-800
        ">
          Welcome Back 👋
        </h1>

        <p className="
          text-center
          text-gray-500
          mb-8
        ">
          Login to continue
        </p>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            border
            p-3
            w-full
            mb-4
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            border
            p-3
            w-full
            mb-6
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {/* LOGIN BUTTON */}

        <button
          onClick={handleLogin}
          className="
            w-full
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:scale-[1.02]
            transition
            shadow-lg
            cursor-pointer
          "
        >
          Login
        </button>

      </div>

    </div>
  );
}