import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Search,
  Home as HomeIcon,
  Heart,
  CalendarCheck,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import API from "../services/api";

import leftHouse from "../assets/house-left.png";
import rightHouse from "../assets/house-right.png";

export default function Home() {
  const navigate = useNavigate();

  const [featured, setFeatured] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await API.get("/property/featured");
        setFeatured(res.data.properties || []);
      } catch (err) {
        console.log(err);
        setFeatured([]);
      }
    };

    fetchFeatured();
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/properties?keyword=${search.trim()}`);
    } else {
      navigate("/properties");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 overflow-hidden">
      <Navbar />

      <section className="max-w-7xl mx-auto min-h-screen flex items-center px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center w-full">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-md text-sm font-semibold text-blue-600">
                <ShieldCheck size={18} />
                Trusted Real Estate Platform
              </p>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900 mt-6">
                Find Your
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dream Home
                </span>
              </h1>

              <p className="mt-8 text-lg text-gray-600 leading-8 max-w-xl">
                Buy, rent, and explore premium villas, luxury apartments, and
                modern homes with secure booking and trusted support.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 bg-white/85 backdrop-blur-xl rounded-[28px] shadow-2xl p-4 max-w-2xl border border-white/40"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search
                    size={20}
                    className="absolute left-4 top-4 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search city, location or property..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition flex items-center justify-center gap-2"
                >
                  Search
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/properties"
                className="bg-white text-gray-800 px-6 py-3 rounded-2xl shadow-lg font-semibold hover:scale-105 transition flex items-center gap-2"
              >
                <Building2 size={20} />
                Explore Properties
              </Link>

              <Link
                to="/about"
                className="bg-black text-white px-6 py-3 rounded-2xl shadow-lg font-semibold hover:scale-105 transition flex items-center gap-2"
              >
                <Users size={20} />
                About Us
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10 max-w-2xl">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl">
                <Building2 className="text-blue-600" />
                <h2 className="text-3xl font-bold mt-3">500+</h2>
                <p className="text-gray-500 text-sm">Properties</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl">
                <Users className="text-purple-600" />
                <h2 className="text-3xl font-bold mt-3">2K+</h2>
                <p className="text-gray-500 text-sm">Happy Clients</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl col-span-2 sm:col-span-1">
                <ShieldCheck className="text-green-600" />
                <h2 className="text-3xl font-bold mt-3">24/7</h2>
                <p className="text-gray-500 text-sm">Support</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative flex justify-center items-center mt-8 lg:mt-0"
          >
            <img
              src={rightHouse}
              alt="Luxury House"
              className="w-full max-w-[520px] rounded-[40px] shadow-2xl object-cover"
            />

            <img
              src={leftHouse}
              alt="Modern Villa"
              className="hidden sm:block absolute -bottom-10 -left-6 lg:-left-10 w-56 lg:w-72 rounded-[30px] border-4 border-white shadow-2xl"
            />

            <div className="absolute top-6 right-2 lg:-right-5 bg-white/90 backdrop-blur-xl rounded-3xl p-5 lg:p-6 shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-600">
                500+
              </h2>

              <p className="text-gray-500 mt-1 text-sm lg:text-base">
                Premium Properties
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Why Choose Lidharshana Homez?
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-8">
            A modern real-estate experience with trusted listings, easy
            booking, and premium customer support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white/80 rounded-[32px] p-8 shadow-xl">
            <HomeIcon className="text-blue-600" size={42} />
            <h3 className="text-2xl font-bold mt-5">Verified Homes</h3>
            <p className="text-gray-600 mt-3 leading-7">
              Browse verified villas, apartments, and rental properties with
              complete details.
            </p>
          </div>

          <div className="bg-white/80 rounded-[32px] p-8 shadow-xl">
            <Heart className="text-pink-600" size={42} />
            <h3 className="text-2xl font-bold mt-5">Save Favorites</h3>
            <p className="text-gray-600 mt-3 leading-7">
              Save properties you love and compare them later before booking.
            </p>
          </div>

          <div className="bg-white/80 rounded-[32px] p-8 shadow-xl">
            <CalendarCheck className="text-green-600" size={42} />
            <h3 className="text-2xl font-bold mt-5">Easy Booking</h3>
            <p className="text-gray-600 mt-3 leading-7">
              Send booking requests easily and get admin approval updates.
            </p>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex justify-between items-center flex-wrap gap-5 mb-10">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900">
                Featured Properties
              </h2>

              <p className="text-gray-600 mt-3">
                Hand-picked premium homes for you.
              </p>
            </div>

            <Link
              to="/properties"
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:bg-blue-700 transition"
            >
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
            {featured.slice(0, 3).map((item) => (
              <PropertyCard key={item._id} property={item} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}