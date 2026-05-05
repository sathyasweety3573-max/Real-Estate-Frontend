import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  MapPin,
  IndianRupee,
  BedDouble,
  Bath,
  Maximize,
  Heart,
  CalendarCheck,
  ArrowLeft,
  ShieldCheck,
  X,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

export default function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.user?.role === "admin";

  const [bookingForm, setBookingForm] = useState({
    name: user?.user?.name || "",
    email: user?.user?.email || "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get(`/property/${id}`);
        setProperty(res.data.property);
      } catch {
        toast.error("Failed to load property ❌");
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
        <div className="bg-white px-10 py-6 rounded-3xl shadow-2xl text-2xl font-bold text-gray-700">
          Loading Property...
        </div>
      </div>
    );
  }

  const priceFormat = Number(property.price || 0).toLocaleString("en-IN");

  const handleFavorite = async () => {
    if (!user) {
      toast.error("Please login first ❌");
      return;
    }

    try {
      setFavLoading(true);

      const res = await API.post(`/auth/favorite/${property._id}`);

      toast.success(res.data.message || "Favourite updated ❤️");
    } catch (err) {
      toast.error(err.response?.data?.message || "Favourite failed ❌");
    } finally {
      setFavLoading(false);
    }
  };

  const openBookingForm = () => {
    if (!user) {
      toast.error("Please login first ❌");
      return;
    }

    if (isAdmin) {
      toast.error("Admin cannot book properties 🚫");
      return;
    }

    setShowBookingForm(true);
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      toast.error("Name, email and phone are required");
      return;
    }

    try {
      setBookingLoading(true);

      await API.post(`/booking/${property._id}`, bookingForm);

      setBookingSuccess(true);
      setShowBookingForm(false);

      toast.success("Booking Request Sent 🏡");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed ❌");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          <div className="relative">
            <img
              src={property.images?.[0] || "https://via.placeholder.com/600x400"}
              alt={property.title}
              className="rounded-[35px] h-[420px] md:h-[600px] w-full object-cover shadow-2xl border-4 border-white"
            />

            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-lg px-6 py-4 rounded-2xl shadow-xl">
              <p className="text-sm text-gray-500">
                {property.purpose === "rent" ? "Monthly Rent" : "Price"}
              </p>

              <h2 className="text-3xl font-bold text-blue-600 flex items-center gap-1">
                <IndianRupee size={26} />
                {priceFormat}
              </h2>
            </div>

            {isAdmin && (
              <div className="absolute top-6 right-6 bg-red-100 text-red-700 px-5 py-3 rounded-2xl shadow-lg font-bold flex items-center gap-2">
                <ShieldCheck size={20} />
                Admin View
              </div>
            )}
          </div>

          <div>
            <p className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold mb-5">
              {property.type || "Premium Property"} •{" "}
              {property.purpose === "rent" ? "For Rent" : "For Sale"}
            </p>

            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              {property.title}
            </h1>

            <p className="mt-5 text-xl md:text-2xl text-gray-600 flex items-center gap-2">
              <MapPin size={28} />
              {property.location}
            </p>

            <div className="mt-8 bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
              <h3 className="text-3xl font-bold text-gray-800 mb-5">
                Property Description
              </h3>

              <p className="text-gray-600 leading-9 text-lg">
                {property.description ||
                  "This premium property offers modern architecture, spacious rooms, peaceful surroundings, and a comfortable lifestyle."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
              <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
                <BedDouble className="mx-auto text-blue-600" size={34} />
                <p className="mt-3 text-2xl font-bold">{property.bedrooms || 3}</p>
                <p className="text-gray-500 text-sm">Bedrooms</p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
                <Bath className="mx-auto text-purple-600" size={34} />
                <p className="mt-3 text-2xl font-bold">{property.bathrooms || 2}</p>
                <p className="text-gray-500 text-sm">Bathrooms</p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
                <Maximize className="mx-auto text-green-600" size={34} />
                <p className="mt-3 text-2xl font-bold">{property.area || 1200}</p>
                <p className="text-gray-500 text-sm">Sq.ft</p>
              </div>
            </div>

            {property.amenities?.length > 0 && (
              <div className="mt-8 bg-white/80 rounded-3xl p-6 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800">Amenities</h3>

                <div className="flex flex-wrap gap-3 mt-5">
                  {property.amenities.map((item, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-5 mt-10">
              {!isAdmin && (
                <button
                  onClick={openBookingForm}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:scale-105 transition flex items-center gap-2"
                >
                  <CalendarCheck size={22} />
                  Book Now
                </button>
              )}

              {!isAdmin && (
                <button
                  onClick={handleFavorite}
                  disabled={favLoading}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:scale-105 transition disabled:opacity-50 flex items-center gap-2"
                >
                  <Heart size={22} />
                  {favLoading ? "Updating..." : "Favourite"}
                </button>
              )}

              {isAdmin && (
                <div className="bg-white/80 border border-blue-100 rounded-3xl p-6 shadow-xl w-full">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Admin Management Mode
                  </h3>

                  <p className="text-gray-600 mt-3 leading-7">
                    Admin can manage this property from dashboard. Booking
                    buttons are hidden for admin to avoid confusion.
                  </p>
                </div>
              )}
            </div>

            {bookingSuccess && !isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 bg-green-50 border border-green-200 rounded-3xl p-8 shadow-xl"
              >
                <h3 className="text-3xl font-bold text-green-700">
                  Booking Request Submitted ✅
                </h3>

                <p className="mt-4 text-gray-700 leading-8">
                  Your booking request for{" "}
                  <span className="font-bold">{property.title}</span> has been
                  submitted successfully. Our team will contact you soon.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center px-4">
          <motion.form
            onSubmit={handleBooking}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[35px] shadow-2xl p-8 w-full max-w-lg relative"
          >
            <button
              type="button"
              onClick={() => setShowBookingForm(false)}
              className="absolute top-5 right-5 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
            >
              <X size={22} />
            </button>

            <h2 className="text-3xl font-extrabold text-gray-800">
              Book Property 🏡
            </h2>

            <p className="text-gray-500 mt-2">
              Fill your details. Admin will approve your request.
            </p>

            <div className="mt-7 space-y-5">
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-400" size={20} />

                <input
                  type="text"
                  placeholder="Your Name"
                  value={bookingForm.name}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, name: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-400" size={20} />

                <input
                  type="email"
                  placeholder="Your Email"
                  value={bookingForm.email}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-4 text-gray-400" size={20} />

                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={bookingForm.phone}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, phone: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="relative">
                <MessageSquare
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />

                <textarea
                  rows="4"
                  placeholder="Message optional"
                  value={bookingForm.message}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, message: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] transition disabled:opacity-50"
              >
                {bookingLoading ? "Submitting..." : "Submit Booking Request"}
              </button>
            </div>
          </motion.form>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => window.history.back()}
          className="bg-black text-white px-6 py-3 rounded-2xl shadow-2xl hover:scale-105 hover:bg-gray-800 transition flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <Footer />
    </div>
  );
}