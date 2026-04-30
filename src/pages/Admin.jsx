import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  CalendarCheck,
  IndianRupee,
  TrendingUp,
  ShieldCheck,
  Home,
  UserCheck,
  BadgeCheck,
} from "lucide-react";

export default function Admin() {

  // ✅ ADMIN CHECK

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ✅ BLOCK NORMAL USERS

  if (!user) {
    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-red-50
        to-pink-100
      ">
        <div className="
          bg-white
          p-10
          rounded-3xl
          shadow-2xl
          text-center
        ">
          <h1 className="
            text-4xl
            font-bold
            text-red-600
          ">
            Access Denied ❌
          </h1>

          <p className="
            mt-4
            text-gray-600
            text-lg
          ">
            Please login to access admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  // ✅ SAMPLE DASHBOARD DATA

  const stats = [
    {
      title: "Total Properties",
      value: "120",
      icon: <Building2 size={40} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Bookings",
      value: "58",
      icon: <CalendarCheck size={40} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Registered Users",
      value: "240",
      icon: <Users size={40} />,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Revenue",
      value: "₹ 12L",
      icon: <IndianRupee size={40} />,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  // ✅ RECENT BOOKINGS

  const recentBookings = [
    {
      name: "Arjun",
      property: "Luxury Villa",
      status: "Confirmed",
    },
    {
      name: "Priya",
      property: "Modern Apartment",
      status: "Pending",
    },
    {
      name: "Rahul",
      property: "Beachside Bungalow",
      status: "Confirmed",
    },
  ];

  // ✅ RECENT ACTIVITIES

  const activities = [
    "New property added in Chennai",
    "Booking confirmed for Luxury Villa",
    "New user registered today",
    "Premium apartment sold successfully",
  ];

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-blue-50
      to-purple-100
    ">

      <Navbar />

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-12
      ">

        {/* HERO SECTION */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            bg-white/70
            backdrop-blur-xl
            rounded-[40px]
            shadow-2xl
            p-10
            border border-white/40
          "
        >

          <div className="
            flex
            flex-col
            lg:flex-row
            justify-between
            items-center
            gap-10
          ">

            <div>

              <h1 className="
                text-4xl
                lg:text-5xl
                font-extrabold
                text-gray-800
              ">
                Admin Dashboard ⚡
              </h1>

              <p className="
                mt-5
                text-lg
                text-gray-600
                max-w-2xl
                leading-8
              ">
                Manage properties, bookings,
                users, and platform growth
                with a modern real estate
                admin management dashboard.
              </p>

            </div>

            <div className="
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              text-white
              p-6
              rounded-3xl
              shadow-xl
              flex
              items-center
              gap-4
            ">

              <ShieldCheck size={55} />

              <div>

                <h2 className="
                  text-2xl
                  font-bold
                ">
                  Secure Panel
                </h2>

                <p className="
                  text-sm
                  opacity-90
                ">
                  Admin authenticated access
                </p>

              </div>

            </div>

          </div>

        </motion.div>

        {/* STATS */}

        <div className="
          grid
          md:grid-cols-2
          xl:grid-cols-4
          gap-8
          mt-14
        ">

          {stats.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{
                scale: 1.04,
                y: -5,
              }}
              className={`
                bg-gradient-to-r
                ${item.color}
                text-white
                rounded-[30px]
                p-8
                shadow-2xl
              `}
            >

              <div className="
                flex
                justify-between
                items-center
              ">

                <div>

                  <p className="
                    text-lg
                    opacity-90
                  ">
                    {item.title}
                  </p>

                  <h2 className="
                    text-5xl
                    font-bold
                    mt-4
                  ">
                    {item.value}
                  </h2>

                </div>

                <div className="opacity-90">
                  {item.icon}
                </div>

              </div>

            </motion.div>

          ))}

        </div>

        {/* QUICK ACTIONS */}

        <div className="
          grid
          md:grid-cols-3
          gap-8
          mt-14
        ">

          <div className="
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            p-8
            shadow-xl
          ">

            <Home
              size={45}
              className="text-blue-600"
            />

            <h2 className="
              text-2xl
              font-bold
              mt-5
            ">
              Manage Properties
            </h2>

            <p className="
              text-gray-600
              mt-3
              leading-7
            ">
              Add, update, and manage all
              listed premium properties.
            </p>

          </div>

          <div className="
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            p-8
            shadow-xl
          ">

            <UserCheck
              size={45}
              className="text-green-600"
            />

            <h2 className="
              text-2xl
              font-bold
              mt-5
            ">
              User Management
            </h2>

            <p className="
              text-gray-600
              mt-3
              leading-7
            ">
              Monitor registered users and
              customer activities easily.
            </p>

          </div>

          <div className="
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            p-8
            shadow-xl
          ">

            <BadgeCheck
              size={45}
              className="text-pink-600"
            />

            <h2 className="
              text-2xl
              font-bold
              mt-5
            ">
              Booking Approval
            </h2>

            <p className="
              text-gray-600
              mt-3
              leading-7
            ">
              Verify and approve customer
              property bookings securely.
            </p>

          </div>

        </div>

        {/* ANALYTICS + BOOKINGS */}

        <div className="
          grid
          lg:grid-cols-2
          gap-10
          mt-14
        ">

          {/* GROWTH */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              bg-white/80
              backdrop-blur-lg
              rounded-[35px]
              shadow-2xl
              p-8
            "
          >

            <div className="
              flex
              items-center
              gap-3
            ">

              <TrendingUp
                size={35}
                className="text-blue-600"
              />

              <h2 className="
                text-3xl
                font-bold
                text-gray-800
              ">
                Platform Growth
              </h2>

            </div>

            <div className="
              mt-10
              space-y-8
            ">

              <div>

                <div className="
                  flex
                  justify-between
                  mb-2
                ">

                  <p className="font-semibold">
                    Property Sales
                  </p>

                  <p>85%</p>

                </div>

                <div className="
                  w-full
                  bg-gray-200
                  rounded-full
                  h-4
                ">

                  <div className="
                    bg-blue-600
                    h-4
                    rounded-full
                    w-[85%]
                  "></div>

                </div>

              </div>

              <div>

                <div className="
                  flex
                  justify-between
                  mb-2
                ">

                  <p className="font-semibold">
                    Customer Satisfaction
                  </p>

                  <p>92%</p>

                </div>

                <div className="
                  w-full
                  bg-gray-200
                  rounded-full
                  h-4
                ">

                  <div className="
                    bg-green-500
                    h-4
                    rounded-full
                    w-[92%]
                  "></div>

                </div>

              </div>

              <div>

                <div className="
                  flex
                  justify-between
                  mb-2
                ">

                  <p className="font-semibold">
                    Booking Conversion
                  </p>

                  <p>74%</p>

                </div>

                <div className="
                  w-full
                  bg-gray-200
                  rounded-full
                  h-4
                ">

                  <div className="
                    bg-pink-500
                    h-4
                    rounded-full
                    w-[74%]
                  "></div>

                </div>

              </div>

            </div>

          </motion.div>

          {/* BOOKINGS */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              bg-white/80
              backdrop-blur-lg
              rounded-[35px]
              shadow-2xl
              p-8
            "
          >

            <h2 className="
              text-3xl
              font-bold
              text-gray-800
            ">
              Recent Bookings 🏡
            </h2>

            <div className="
              mt-8
              space-y-5
            ">

              {recentBookings.map((item, index) => (

                <div
                  key={index}
                  className="
                    flex
                    justify-between
                    items-center
                    bg-gray-50
                    p-5
                    rounded-2xl
                    hover:shadow-lg
                    transition
                  "
                >

                  <div>

                    <h3 className="
                      text-xl
                      font-bold
                      text-gray-800
                    ">
                      {item.name}
                    </h3>

                    <p className="text-gray-500">
                      {item.property}
                    </p>

                  </div>

                  <span
                    className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold
                      ${
                        item.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {item.status}
                  </span>

                </div>

              ))}

            </div>

          </motion.div>

        </div>

        {/* RECENT ACTIVITY */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            mt-14
            bg-white/80
            backdrop-blur-xl
            rounded-[35px]
            shadow-2xl
            p-10
          "
        >

          <h2 className="
            text-3xl
            font-bold
            text-gray-800
          ">
            Recent Activity 📌
          </h2>

          <div className="
            mt-8
            space-y-5
          ">

            {activities.map((item, index) => (

              <div
                key={index}
                className="
                  bg-gray-50
                  p-5
                  rounded-2xl
                  hover:shadow-md
                  transition
                "
              >
                {item}
              </div>

            ))}

          </div>

        </motion.div>

      </div>

    </div>

  );
}