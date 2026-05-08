import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Settings } from "lucide-react";
import { motion } from "framer-motion";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  Home,
  Building2,
  Info,
  Phone,
  Plus,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Heart,
  CalendarCheck,
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setOpen(false);
    setMobileMenu(false);

    navigate("/login", { replace: true });
  };

  const loggedUser = user?.user || user;

  const isAdmin = loggedUser?.role === "admin";

  const navLink = (path) => `
    flex
    items-center
    gap-2
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

  const closeMobile = () => {
    setMobileMenu(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="
        sticky
        top-0
        z-50
        bg-white/80
        backdrop-blur-2xl
        border-b
        border-white/40
        shadow-lg
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          md:px-6
          py-4
          flex
          justify-between
          items-center
        "
      >
        {/* LOGO */}
        <div
          onClick={() => navigate("/home")}
          className="cursor-pointer"
        >
          <h1
            className="
              text-xl
              md:text-2xl
              font-extrabold
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              bg-clip-text
              text-transparent
            "
          >
            🏡 Lidharshana Homez
          </h1>

          <p
            className="
              text-[11px]
              md:text-xs
              text-gray-500
            "
          >
            Premium Real Estate
          </p>
        </div>

        {/* DESKTOP MENU */}
        <div
          className="
            hidden
            lg:flex
            items-center
            gap-7
          "
        >
          <Link to="/home" className={navLink("/home")}>
            <Home size={18} />
            Home
          </Link>

          <Link
            to="/properties"
            className={navLink("/properties")}
          >
            <Building2 size={18} />
            Properties
          </Link>

          <Link to="/about" className={navLink("/about")}>
            <Info size={18} />
            About
          </Link>

          <Link to="/contact" className={navLink("/contact")}>
            <Phone size={18} />
            Contact
          </Link>

          {isAdmin && (
            <>
              <Link
                to="/admin"
                className="
                  bg-black
                  text-white
                  px-5
                  py-2.5
                  rounded-2xl
                  shadow-lg
                  hover:bg-gray-800
                  transition
                  flex
                  items-center
                  gap-2
                  font-semibold
                "
              >
                <LayoutDashboard size={18} />
                Admin
              </Link>

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
                  shadow-lg
                  hover:scale-105
                  transition
                  flex
                  items-center
                  gap-2
                  font-semibold
                "
              >
                <Plus size={18} />
                Add Property
              </Link>
            </>
          )}

          {loggedUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="
                  flex
                  items-center
                  gap-3
                  bg-white
                  px-3
                  py-2
                  rounded-full
                  border
                  shadow-lg
                  hover:scale-105
                  transition
                "
              >
                <div
                  className="
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
                  "
                >
                  {loggedUser?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <span
                  className="
                    font-semibold
                    text-gray-700
                    max-w-[120px]
                    truncate
                  "
                >
                  {loggedUser?.name || "User"}
                </span>
              </button>

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
                    z-50
                  "
                >
                  <div className="text-center">
                    <div
                      className="
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
                      "
                    >
                      {loggedUser?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <h2
                      className="
                        mt-4
                        text-2xl
                        font-bold
                        text-gray-800
                      "
                    >
                      {loggedUser?.name || "User"}
                    </h2>

                    <p
                      className="
                        text-gray-500
                        mt-1
                        text-sm
                        break-all
                      "
                    >
                      {loggedUser?.email}
                    </p>

                    <p
                      className="
                        mt-3
                        inline-block
                        bg-blue-100
                        text-blue-700
                        px-4
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                      "
                    >
                      {isAdmin ? "Admin" : "Customer"}
                    </p>
                  </div>
<button
  onClick={() => {
    setOpen(false);
    navigate("/settings");
  }}
  className="
    w-full
    bg-gray-100
    hover:bg-gray-200
    text-gray-700
    py-3
    rounded-2xl
    font-semibold
    transition
    flex
    items-center
    justify-center
    gap-2
  "
>
  <Settings size={18} />
  Settings
</button>
                  {!isAdmin && (
                    <div className="mt-6 space-y-3">
                      <button
                        onClick={() => {
                          setOpen(false);
                          navigate("/properties");
                        }}
                        className="
                          w-full
                          bg-gray-100
                          hover:bg-gray-200
                          text-gray-700
                          py-3
                          rounded-2xl
                          font-semibold
                          transition
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >
                        <Heart size={18} />
                        Saved Properties
                      </button>

                      <button
                        onClick={() => {
                          setOpen(false);
                          navigate("/properties");
                        }}
                        className="
                          w-full
                          bg-gray-100
                          hover:bg-gray-200
                          text-gray-700
                          py-3
                          rounded-2xl
                          font-semibold
                          transition
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >
                        <CalendarCheck size={18} />
                        My Bookings
                      </button>
                    </div>
                  )}

                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      mt-5
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      py-3
                      rounded-2xl
                      font-semibold
                      transition
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <LogOut size={18} />
                    Logout
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
                px-6
                py-2.5
                rounded-2xl
                hover:bg-blue-600
                hover:text-white
                transition
                font-semibold
              "
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="lg:hidden"
        >
          {mobileMenu ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
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
            lg:hidden
            bg-white
            px-6
            pb-6
            space-y-4
            shadow-xl
            border-t
          "
        >
          <Link
            to="/home"
            onClick={closeMobile}
            className="flex items-center gap-2 font-semibold text-gray-700"
          >
            <Home size={18} />
            Home
          </Link>

          <Link
            to="/properties"
            onClick={closeMobile}
            className="flex items-center gap-2 font-semibold text-gray-700"
          >
            <Building2 size={18} />
            Properties
          </Link>

          <Link
            to="/about"
            onClick={closeMobile}
            className="flex items-center gap-2 font-semibold text-gray-700"
          >
            <Info size={18} />
            About
          </Link>

          <Link
            to="/contact"
            onClick={closeMobile}
            className="flex items-center gap-2 font-semibold text-gray-700"
          >
            <Phone size={18} />
            Contact
          </Link>

          {isAdmin && (
            <>
              <Link
                to="/admin"
                onClick={closeMobile}
                className="flex items-center gap-2 font-semibold text-gray-700"
              >
                <LayoutDashboard size={18} />
                Admin
              </Link>

              <Link
                to="/add-property"
                onClick={closeMobile}
                className="flex items-center gap-2 font-semibold text-gray-700"
              >
                <Plus size={18} />
                Add Property
              </Link>
            </>
          )}

          {loggedUser ? (
            <>
              <div className="bg-slate-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      w-11
                      h-11
                      rounded-full
                      bg-gradient-to-r
                      from-blue-600
                      to-purple-600
                      flex
                      items-center
                      justify-center
                      text-white
                      font-bold
                    "
                  >
                    {loggedUser?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div>
                    <p className="font-bold text-gray-800">
                      {loggedUser?.name || "User"}
                    </p>

                    <p className="text-xs text-gray-500 break-all">
                      {loggedUser?.email}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="
                  w-full
                  bg-red-500
                  text-white
                  py-3
                  rounded-2xl
                  font-semibold
                  flex
                  justify-center
                  items-center
                  gap-2
                "
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeMobile}
              className="
                block
                text-center
                bg-blue-600
                text-white
                py-3
                rounded-2xl
                font-semibold
              "
            >
              Login
            </Link>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}