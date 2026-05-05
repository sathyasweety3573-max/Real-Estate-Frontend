import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  Users,
  CalendarCheck,
  IndianRupee,
  ShieldCheck,
  Plus,
  Activity,
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= STATE =================

  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  // ================= ADMIN CHECK =================

  if (user?.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <h1 className="text-3xl font-bold text-red-600">
          Access Denied 🚫
        </h1>
      </div>
    );
  }

  // ================= FETCH DATA =================

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [propertyRes, bookingRes, userRes] =
          await Promise.all([
            API.get("/property"),
            API.get("/booking"),
            API.get("/admin/users"),
          ]);

        setProperties(propertyRes.data || []);
        setBookings(bookingRes.data || []);
        setUsers(userRes.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= STATS =================

  const stats = [
    {
      title: "Total Properties",
      value: properties.length,
      icon: <Building2 size={40} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Bookings",
      value: bookings.length,
      icon: <CalendarCheck size={40} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Users",
      value: users.length,
      icon: <Users size={40} />,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Revenue",
      value: `₹ ${bookings.length * 5000}`, // simple calc
      icon: <IndianRupee size={40} />,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading Admin Dashboard...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HERO */}
        <div className="bg-white p-10 rounded-3xl shadow-xl flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              Admin Dashboard ⚡
            </h1>
            <p className="text-gray-500 mt-2">
              Manage everything from here
            </p>
          </div>

          <div className="bg-blue-600 text-white px-6 py-4 rounded-2xl flex items-center gap-3">
            <ShieldCheck />
            Admin Access
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          {stats.map((item, i) => (
            <div
              key={i}
              className={`bg-gradient-to-r ${item.color} text-white p-6 rounded-3xl shadow-xl`}
            >
              <div className="flex justify-between">
                <div>
                  <p>{item.title}</p>
                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <button
            onClick={() => navigate("/add-property")}
            className="bg-white p-6 rounded-3xl shadow-xl text-left hover:scale-105 transition"
          >
            <Plus className="text-blue-600" size={40} />
            <h2 className="text-xl font-bold mt-3">
              Add Property
            </h2>
          </button>

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <Users className="text-green-600" size={40} />
            <h2 className="text-xl font-bold mt-3">
              Total Users
            </h2>
            <p>{users.length}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <CalendarCheck className="text-purple-600" size={40} />
            <h2 className="text-xl font-bold mt-3">
              Total Bookings
            </h2>
            <p>{bookings.length}</p>
          </div>
        </div>

        {/* BOOKINGS */}
        <div className="mt-10 bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-5">
            Recent Bookings
          </h2>

          {bookings.slice(0, 5).map((b) => (
            <div
              key={b._id}
              className="flex justify-between border-b py-3"
            >
              <p>{b.name}</p>
              <p>{b.status}</p>
            </div>
          ))}
        </div>

        {/* USERS */}
        <div className="mt-10 bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-5">
            Users
          </h2>

          {users.slice(0, 5).map((u) => (
            <div
              key={u._id}
              className="flex justify-between border-b py-3"
            >
              <p>{u.name}</p>
              <p>{u.role}</p>
            </div>
          ))}
        </div>

        {/* ACTIVITY */}
        <div className="mt-10 bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Activity /> Activity
          </h2>

          <p>✔ Properties loaded: {properties.length}</p>
          <p>✔ Bookings loaded: {bookings.length}</p>
          <p>✔ Users loaded: {users.length}</p>
        </div>
      </div>
    </div>
  );
}