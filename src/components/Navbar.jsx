import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] =
    useState(false);

  const dropdownRef = useRef(null);

  // ================= LOAD USER =================

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      try {

        setUser(JSON.parse(storedUser));

      } catch {

        localStorage.removeItem("user");

      }

    }

  }, []);

  // ================= CLOSE DROPDOWN =================

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          e.target
        )
      ) {
        setOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  // ================= LOGOUT =================

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    setOpen(false);

    navigate("/");

    window.location.reload();

  };

  // ================= ACTIVE LINK =================

  const navLink = (path) => `
    relative
    text-[15px]
    font-semibold
    transition
    hover:text-blue-600
    ${
      location.pathname === path
        ? "text-blue-600"
        : "text-gray-700"
    }
  `;

  return (

    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="
        sticky
        top-0
        z-50
        backdrop-blur-2xl
        bg-white/75
        border-b
        border-white/30
        shadow-lg
      "
    >

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        justify-between
        items-center
      ">

        {/* LOGO */}

        <div
          onClick={() => navigate("/")}
          className="
            cursor-pointer
          "
        >

          <h1 className="
            text-2xl
            font-bold
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            bg-clip-text
            text-transparent
          ">
            🏡 Lidharshana Homez
          </h1>

          <p className="
            text-xs
            text-gray-500
          ">
            Luxury Real Estate Platform
          </p>

        </div>

        {/* DESKTOP MENU */}

        <div className="
          hidden
          lg:flex
          items-center
          gap-7
        ">

          <Link
            to="/"
            className={navLink("/")}
          >
            Home
          </Link>

          <Link
            to="/properties"
            className={navLink("/properties")}
          >
            Properties
          </Link>

          <Link
            to="/about"
            className={navLink("/about")}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={navLink("/contact")}
          >
            Contact
          </Link>

          {/* ADMIN BUTTON */}

          <Link
            to="/admin"
            className="
              bg-black
              text-white
              px-5
              py-2.5
              rounded-2xl
              hover:bg-gray-800
              transition
              shadow-lg
            "
          >
            Admin ⚡
          </Link>

          {/* ADD PROPERTY */}

          <Link
            to="/add-property"
            className="
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              text-white
              px-5
              py-2.5
              rounded-2xl
              hover:scale-105
              transition
              shadow-lg
            "
          >
            + Add Property
          </Link>

          {/* PROFILE */}

          {user ? (

            <div
              className="relative"
              ref={dropdownRef}
            >

              <button
                onClick={() =>
                  setOpen(!open)
                }
                className="
                  flex
                  items-center
                  gap-3
                  bg-white
                  px-4
                  py-2
                  rounded-full
                  shadow-lg
                  border
                  hover:scale-105
                  transition
                "
              >

                <div className="
                  w-10
                  h-10
                  rounded-full
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  flex
                  items-center
                  justify-center
                  text-white
                  font-bold
                ">
                  {user?.user?.name?.charAt(0)}
                </div>

                <span className="
                  font-semibold
                  text-gray-700
                ">
                  {user?.user?.name}
                </span>

              </button>

              {/* DROPDOWN */}

              {open && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    absolute
                    right-0
                    mt-4
                    w-80
                    bg-white/95
                    backdrop-blur-2xl
                    rounded-3xl
                    shadow-2xl
                    border
                    p-6
                  "
                >

                  <div className="text-center">

                    <div className="
                      w-20
                      h-20
                      mx-auto
                      rounded-full
                      bg-gradient-to-r
                      from-blue-600
                      to-purple-600
                      flex
                      items-center
                      justify-center
                      text-white
                      text-3xl
                      font-bold
                    ">
                      {user?.user?.name?.charAt(0)}
                    </div>

                    <h2 className="
                      mt-4
                      text-2xl
                      font-bold
                    ">
                      {user?.user?.name}
                    </h2>

                    <p className="
                      text-gray-500
                      text-sm
                      mt-1
                    ">
                      {user?.user?.email}
                    </p>

                  </div>

                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      mt-6
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      py-3
                      rounded-2xl
                      font-semibold
                      transition
                    "
                  >
                    Logout 🚪
                  </button>

                </motion.div>

              )}

            </div>

          ) : (

            <Link
              to="/login"
              className="
                border
                border-blue-600
                text-blue-600
                px-5
                py-2.5
                rounded-2xl
                hover:bg-blue-600
                hover:text-white
                transition
              "
            >
              Login
            </Link>

          )}

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() =>
            setMobileMenu(!mobileMenu)
          }
          className="
            lg:hidden
            text-3xl
          "
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}

      {mobileMenu && (

        <div className="
          lg:hidden
          bg-white
          px-6
          pb-6
          space-y-4
          shadow-xl
        ">

          <Link
            to="/"
            className="block"
          >
            Home
          </Link>

          <Link
            to="/properties"
            className="block"
          >
            Properties
          </Link>

          <Link
            to="/about"
            className="block"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="block"
          >
            Contact
          </Link>

          <Link
            to="/admin"
            className="block"
          >
            Admin
          </Link>

          <Link
            to="/add-property"
            className="block"
          >
            Add Property
          </Link>

        </div>

      )}

    </motion.nav>

  );

}