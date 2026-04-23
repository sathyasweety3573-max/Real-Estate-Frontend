import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {

  const location = useLocation();

  const navLink = (path) => `
    relative
    text-lg
    font-semibold
    transition
    duration-300
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
        backdrop-blur-xl
        bg-white/60
        border-b
        border-white/30
        shadow-xl
      "
    >

      <div className="
        max-w-7xl
        mx-auto
        flex
        justify-between
        items-center
        px-8
        py-5
      ">

        {/* LOGO */}

        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="
            text-3xl
            font-extrabold
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            bg-clip-text
            text-transparent
            cursor-pointer
          "
        >
          ✨ Lidharshana Homez 🏡
        </motion.h1>

        {/* NAV LINKS */}

        <div className="flex items-center gap-10">

          <Link to="/" className={navLink("/")}>
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

          <Link
  to="/add-property"
  className={navLink("/add-property")}
>
  Add Property
</Link>

        </div>

      </div>

    </motion.nav>

  );
}