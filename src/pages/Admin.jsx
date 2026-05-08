import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Building2,
  Users,
  CalendarCheck,
  IndianRupee,
  ShieldCheck,
  Plus,
  Activity,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Trash2,
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = storedUser?.user || storedUser;
  const isAdmin = user?.role === "admin";

  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [propertyRes, bookingRes, userRes] = await Promise.all([
        API.get("/property"),
        API.get("/booking"),
        API.get("/admin/users"),
      ]);

      setProperties(
        propertyRes.data.properties ||
          propertyRes.data.property ||
          propertyRes.data ||
          []
      );

      setBookings(
        bookingRes.data.bookings ||
          bookingRes.data ||
          []
      );

      setUsers(
        userRes.data.users ||
          userRes.data ||
          []
      );
    } catch (err) {
      console.log(err);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const updateBookingStatus = async (bookingId, status) => {
    try {
      setStatusLoading(true);

      const res = await API.put(`/booking/${bookingId}/status`, {
        status,
        adminMessage:
          status === "approved"
            ? "Your booking request has been approved by admin."
            : "Your booking request has been rejected by admin.",
      });

      toast.success(res.data.message || "Booking updated");

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? res.data.booking : booking
        )
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update booking status"
      );
    } finally {
      setStatusLoading(false);
    }
  };

  const deleteBooking = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Delete this booking permanently?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/booking/${bookingId}`);

      setBookings((prev) =>
        prev.filter((booking) => booking._id !== bookingId)
      );

      toast.success("Booking deleted successfully 🗑️");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Delete failed"
      );
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <h1 className="text-3xl font-bold text-red-600">
          Access Denied 🚫
        </h1>
      </div>
    );
  }

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  );

  const approvedBookings = bookings.filter(
    (booking) => booking.status === "approved"
  );

  const stats = [
    {
      title: "Total Properties",
      value: properties.length,
      icon: <Building2 size={40} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Booking Requests",
      value: bookings.length,
      icon: <CalendarCheck size={40} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Pending",
      value: pendingBookings.length,
      icon: <Activity size={40} />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Approved",
      value: approvedBookings.length,
      icon: <CheckCircle size={40} />,
      color: "from-purple-500 to-pink-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <h1 className="text-2xl font-bold">
          Loading Admin Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[35px] shadow-2xl flex flex-col md:flex-row justify-between gap-6 md:items-center"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Admin Dashboard ⚡
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Manage properties, users, and booking approvals.
            </p>
          </div>

          <div className="bg-blue-600 text-white px-6 py-4 rounded-2xl flex items-center gap-3 font-bold shadow-xl">
            <ShieldCheck />
            Admin Access
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          {stats.map((item, i) => (
            <div
              key={i}
              className={`bg-gradient-to-r ${item.color} text-white p-6 rounded-3xl shadow-xl`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                {item.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <button
            onClick={() => navigate("/add-property")}
            className="bg-white p-6 rounded-3xl shadow-xl text-left hover:scale-105 transition"
          >
            <Plus className="text-blue-600" size={40} />
            <h2 className="text-xl font-bold mt-3">
              Add Property
            </h2>
            <p className="text-gray-500 mt-2">
              Upload new property listing
            </p>
          </button>

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <Users className="text-green-600" size={40} />
            <h2 className="text-xl font-bold mt-3">
              Total Users
            </h2>
            <p className="text-3xl font-bold mt-2">
              {users.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <IndianRupee className="text-orange-600" size={40} />
            <h2 className="text-xl font-bold mt-3">
              Estimated Revenue
            </h2>
            <p className="text-3xl font-bold mt-2">
              ₹ {approvedBookings.length * 5000}
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-[35px] shadow-2xl">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            Booking Requests 🏡
          </h2>

          {bookings.length === 0 ? (
            <div className="text-center py-14">
              <CalendarCheck
                size={60}
                className="mx-auto text-gray-400"
              />

              <h3 className="text-2xl font-bold text-gray-700 mt-5">
                No Booking Requests
              </h3>

              <p className="text-gray-500 mt-2">
                User booking requests will appear here.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {bookings.map((booking) => {
                const property = booking.property;
                const bookingUser = booking.user;

                return (
                  <div
                    key={booking._id}
                    className="border rounded-[30px] p-5 shadow-lg bg-white"
                  >
                    <div className="flex gap-4">
                      <img
                        src={
                          property?.images?.[0] ||
                          "https://via.placeholder.com/300x200"
                        }
                        alt={property?.title || "Property"}
                        className="w-32 h-32 rounded-2xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">
                          {property?.title || "Property Not Found"}
                        </h3>

                        <p className="flex items-center gap-2 text-gray-500 mt-2">
                          <MapPin size={16} />
                          {property?.location || "Location"}
                        </p>

                        <p className="text-blue-600 font-bold mt-2">
                          ₹{" "}
                          {Number(
                            property?.price || 0
                          ).toLocaleString("en-IN")}
                        </p>

                        <span
                          className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-bold ${
                            booking.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 bg-slate-100 rounded-2xl p-4 space-y-3">
                      <p className="font-bold text-gray-800">
                        Customer Details
                      </p>

                      <p className="flex items-center gap-2 text-gray-700">
                        <Users size={16} />
                        {booking.name || bookingUser?.name}
                      </p>

                      <p className="flex items-center gap-2 text-gray-700 break-all">
                        <Mail size={16} />
                        {booking.email || bookingUser?.email}
                      </p>

                      <p className="flex items-center gap-2 text-gray-700">
                        <Phone size={16} />
                        {booking.phone || bookingUser?.phone}
                      </p>

                      {booking.message && (
                        <p className="text-gray-600">
                          Message: {booking.message}
                        </p>
                      )}
                    </div>

                    {booking.status === "pending" ? (
                      <div className="grid grid-cols-3 gap-3 mt-5">
                        <button
                          disabled={statusLoading}
                          onClick={() =>
                            updateBookingStatus(
                              booking._id,
                              "approved"
                            )
                          }
                          className="bg-green-600 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition disabled:opacity-50 cursor-pointer"
                        >
                          <CheckCircle size={18} />
                          Approve
                        </button>

                        <button
                          disabled={statusLoading}
                          onClick={() =>
                            updateBookingStatus(
                              booking._id,
                              "rejected"
                            )
                          }
                          className="bg-red-500 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition disabled:opacity-50 cursor-pointer"
                       >
                          <XCircle size={18} />
                          Reject
                        </button>

                        <button
                          onClick={() =>
                            deleteBooking(booking._id)
                          }
                          className="bg-black text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition cursor-pointer"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                        <div className="bg-gray-100 rounded-2xl p-4 text-center font-semibold text-gray-600">
                          This booking is {booking.status}
                        </div>

                        <button
                          onClick={() =>
                            deleteBooking(booking._id)
                          }
                          className="bg-black text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition cursor-pointer"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-10 bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-5">
            Users
          </h2>

          {users.length === 0 ? (
            <p className="text-gray-500">
              No users found.
            </p>
          ) : (
            users.slice(0, 5).map((u) => (
              <div
                key={u._id}
                className="flex justify-between border-b py-3"
              >
                <p>{u.name}</p>
                <p>{u.role}</p>
              </div>
            ))
          )}
        </div>

        <div className="mt-10 bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Activity /> Activity
          </h2>

          <p>✔ Properties loaded: {properties.length}</p>
          <p>✔ Bookings loaded: {bookings.length}</p>
          <p>✔ Pending requests: {pendingBookings.length}</p>
          <p>✔ Approved bookings: {approvedBookings.length}</p>
          <p>✔ Users loaded: {users.length}</p>
        </div>
      </div>
    </div>
  );
}