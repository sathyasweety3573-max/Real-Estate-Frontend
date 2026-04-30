import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Register() {

  const navigate = useNavigate();

  // FORM STATE

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ================= REGISTER =================

  const handleRegister = async () => {

    // VALIDATION

    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {

      await API.post(
        "/auth/register",
        form
      );

      toast.success(
        "Registration Successful ✅"
      );

      // CLEAR FORM

      setForm({
        name: "",
        email: "",
        password: "",
      });

      // GO LOGIN PAGE

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {

      console.log(
        "REGISTER ERROR:",
        err.response?.data
      );

      const message =
        err.response?.data?.message ||
        "Registration Failed ❌";

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
      from-green-50
      via-white
      to-blue-100
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
          Create Account ✨
        </h1>

        <p className="
          text-center
          text-gray-500
          mb-8
        ">
          Register to continue
        </p>

        {/* NAME */}

        <input
          type="text"
          placeholder="Enter your name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="
            border
            p-3
            w-full
            mb-4
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="
            border
            p-3
            w-full
            mb-4
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          className="
            border
            p-3
            w-full
            mb-6
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />

        {/* REGISTER BUTTON */}

        <button
          onClick={handleRegister}
          className="
            w-full
            bg-gradient-to-r
            from-green-500
            to-emerald-600
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:scale-[1.02]
            transition
            shadow-lg
          "
        >
          Register
        </button>

        {/* LOGIN LINK */}

        <p className="
          text-center
          text-sm
          text-gray-600
          mt-5
        ">

          Already have account?

          <span
            onClick={() =>
              navigate("/login")
            }
            className="
              text-blue-600
              font-semibold
              ml-2
              cursor-pointer
              hover:underline
            "
          >
            Login
          </span>

        </p>

      </div>

    </div>
  );
}