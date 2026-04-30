import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Contact() {

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-blue-50
      to-purple-100
      overflow-hidden
    ">

      <Navbar />

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-16
      ">

        {/* HERO SECTION */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            text-center
            bg-white/60
            backdrop-blur-xl
            rounded-[40px]
            shadow-2xl
            border
            border-white/40
            p-14
          "
        >

          <h1 className="
            text-3xl
            md:text-5xl
            font-extrabold
            text-gray-800
          ">
            Contact
            <span className="text-blue-600">
              {" "}Lidharshana Homez
            </span>
            {" "}📞
          </h1>

          <p className="
            mt-8
            text-xl
            text-gray-600
            max-w-3xl
            mx-auto
            leading-9
          ">
            We are always ready to help you find
            luxury villas, premium apartments,
            and your perfect dream property.
          </p>

        </motion.div>

        {/* MAIN SECTION */}

        <div className="
          grid
          lg:grid-cols-2
          gap-12
          mt-20
        ">

          {/* LEFT SECTION */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              bg-white/70
              backdrop-blur-xl
              rounded-[40px]
              shadow-2xl
              border
              border-white/40
              p-10
            "
          >

            <h2 className="
              text-4xl
              font-bold
              text-gray-800
            ">
              Get In Touch ✨
            </h2>

            <p className="
              mt-8
              text-gray-600
              text-lg
              leading-9
            ">
              Our expert real estate team helps
              customers discover dream homes
              with trusted guidance and smooth
              booking experiences.
            </p>

            {/* CONTACT INFO */}

            <div className="
              mt-12
              space-y-8
            ">

              <div className="
                bg-white
                rounded-3xl
                shadow-lg
                p-6
              ">

                <h3 className="
                  text-xl
                  font-bold
                  text-blue-600
                ">
                  📍 Address
                </h3>

                <p className="
                  text-gray-600
                  mt-3
                  text-lg
                ">
                  Chennai, Tamil Nadu, India
                </p>

              </div>

              <div className="
                bg-white
                rounded-3xl
                shadow-lg
                p-6
              ">

                <h3 className="
                  text-xl
                  font-bold
                  text-pink-600
                ">
                  📧 Email
                </h3>

                <p className="
                  text-gray-600
                  mt-3
                  text-lg
                ">
                  support@lidharshanahomez.com
                </p>

              </div>

              <div className="
                bg-white
                rounded-3xl
                shadow-lg
                p-6
              ">

                <h3 className="
                  text-xl
                  font-bold
                  text-green-600
                ">
                  📱 Phone
                </h3>

                <p className="
                  text-gray-600
                  mt-3
                  text-lg
                ">
                  +91 9876543210
                </p>

              </div>

            </div>

          </motion.div>

          {/* RIGHT SECTION */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              bg-white/70
              backdrop-blur-xl
              rounded-[40px]
              shadow-2xl
              border
              border-white/40
              p-10
            "
          >

            <h2 className="
              text-4xl
              font-bold
              text-purple-700
            ">
              Send Message 💌
            </h2>

            <p className="
              mt-5
              text-gray-500
              text-lg
            ">
              Feel free to contact us anytime
            </p>

            <div className="
              mt-10
              space-y-6
            ">

              {/* NAME */}

              <input
                type="text"
                placeholder="Enter your name"
                className="
                  w-full
                  p-5
                  rounded-2xl
                  border
                  bg-white
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              {/* EMAIL */}

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  p-5
                  rounded-2xl
                  border
                  bg-white
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              {/* PHONE */}

              <input
                type="text"
                placeholder="Enter mobile number"
                className="
                  w-full
                  p-5
                  rounded-2xl
                  border
                  bg-white
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              {/* MESSAGE */}

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="
                  w-full
                  p-5
                  rounded-2xl
                  border
                  bg-white
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              ></textarea>

              {/* BUTTON */}

              <button
                className="
                  w-full
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  text-white
                  py-5
                  rounded-2xl
                  text-xl
                  font-bold
                  hover:scale-[1.02]
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

        {/* EXTRA SECTION */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            mt-20
            bg-white/60
            backdrop-blur-xl
            rounded-[40px]
            shadow-2xl
            border
            border-white/40
            p-12
            text-center
          "
        >

          <h2 className="
            text-4xl
            font-bold
            text-gray-800
          ">
            Why Choose Us? 🏡
          </h2>

          <div className="
            grid
            md:grid-cols-3
            gap-8
            mt-12
          ">

            <div className="
              bg-white
              rounded-3xl
              p-8
              shadow-lg
            ">
              <h3 className="text-4xl">
                🏠
              </h3>

              <h4 className="
                text-2xl
                font-bold
                mt-4
              ">
                Premium Homes
              </h4>

              <p className="
                text-gray-600
                mt-4
                leading-7
              ">
                Discover luxury villas and
                modern apartments easily.
              </p>

            </div>

            <div className="
              bg-white
              rounded-3xl
              p-8
              shadow-lg
            ">
              <h3 className="text-4xl">
                🤝
              </h3>

              <h4 className="
                text-2xl
                font-bold
                mt-4
              ">
                Trusted Support
              </h4>

              <p className="
                text-gray-600
                mt-4
                leading-7
              ">
                Friendly expert agents ready
                to guide you anytime.
              </p>

            </div>

            <div className="
              bg-white
              rounded-3xl
              p-8
              shadow-lg
            ">
              <h3 className="text-4xl">
                ⚡
              </h3>

              <h4 className="
                text-2xl
                font-bold
                mt-4
              ">
                Fast Booking
              </h4>

              <p className="
                text-gray-600
                mt-4
                leading-7
              ">
                Smooth and secure property
                booking experience.
              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}
