import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* TITLE */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >

          <h1 className="text-6xl font-bold text-gray-800">
            Contact Us 📞
          </h1>

          <p className="mt-6 text-xl text-gray-600">
            We are always here to help you find your dream home.
          </p>

        </motion.div>

        {/* MAIN SECTION */}

        <div className="grid md:grid-cols-2 gap-12 mt-20">

          {/* LEFT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              bg-white/80
              backdrop-blur-lg
              rounded-3xl
              shadow-2xl
              p-10
            "
          >

            <h2 className="text-4xl font-bold text-blue-700">
              Get In Touch ✨
            </h2>

            <div className="mt-6">

  <button
    onClick={() => window.location.href="/admin"}
    className="
      bg-gradient-to-r
      from-black
      to-gray-800
      text-white
      px-6
      py-3
      rounded-2xl
      shadow-xl
      hover:scale-105
      transition
      duration-300
    "
  >
    Admin Dashboard ⚡
  </button>

</div>

            <p className="mt-6 text-gray-600 leading-8">
              Our expert team is ready to help you with luxury villas,
              premium apartments, and dream properties.
            </p>

            {/* INFO */}

            <div className="mt-10 space-y-6">

              <div>
                <h3 className="text-2xl font-semibold">
                  📍 Address
                </h3>

                <p className="text-gray-600 mt-2">
                  Chennai, Tamil Nadu, India
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold">
                  📧 Email
                </h3>

                <p className="text-gray-600 mt-2">
                  support@lidharshanahomez.com
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold">
                  📱 Phone
                </h3>

                <p className="text-gray-600 mt-2">
                  +91 9876543210
                </p>
              </div>

            </div>

          </motion.div>

          {/* RIGHT SIDE FORM */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              bg-white/80
              backdrop-blur-lg
              rounded-3xl
              shadow-2xl
              p-10
            "
          >

            <h2 className="text-4xl font-bold text-purple-700">
              Send Message 💌
            </h2>

            <div className="mt-10 space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              <input
                type="email"
                placeholder="Your Email"
                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              <input
                type="text"
                placeholder="Mobile Number"
                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              ></textarea>

              <button
                className="
                  w-full
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  text-white
                  py-4
                  rounded-2xl
                  text-xl
                  font-bold
                  hover:scale-105
                  transition
                  duration-300
                  shadow-xl
                "
              >
                Send Message 🚀
              </button>

            </div>
          </motion.div>

        </div>

      </div>

    </div>
  );
}