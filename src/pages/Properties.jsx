import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Home,
  IndianRupee,
  RotateCcw,
} from "lucide-react";

import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import API from "../services/api";

export default function Properties() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    keyword: "",
    purpose: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    sort: "latest",
  });

  const [page, setPage] = useState(1);

  const limit = 6;

  // ================= FETCH PROPERTIES =================

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        const res = await API.get("/property");

        setData(res.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // ================= FILTERS =================

  const filteredProperties = useMemo(() => {
    let filtered = [...data];

    if (filters.keyword) {
      const text = filters.keyword.toLowerCase();

      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(text) ||
          item.location?.toLowerCase().includes(text) ||
          item.city?.toLowerCase().includes(text)
      );
    }

    if (filters.purpose) {
      filtered = filtered.filter(
        (item) => item.purpose === filters.purpose
      );
    }

    if (filters.type) {
      filtered = filtered.filter(
        (item) => item.type === filters.type
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(
        (item) => Number(item.bedrooms) >= Number(filters.bedrooms)
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (item) => Number(item.price) >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (item) => Number(item.price) <= Number(filters.maxPrice)
      );
    }

    if (filters.sort === "priceLow") {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (filters.sort === "priceHigh") {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (filters.sort === "popular") {
      filtered.sort((a, b) => Number(b.views || 0) - Number(a.views || 0));
    } else {
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return filtered;
  }, [data, filters]);

  const totalPages = Math.ceil(filteredProperties.length / limit);

  const start = (page - 1) * limit;

  const paginated = filteredProperties.slice(start, start + limit);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const resetFilters = () => {
    setFilters({
      keyword: "",
      purpose: "",
      type: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      sort: "latest",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
      <Navbar />

      {/* HERO */}

      <section className="pt-14 pb-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/80 px-5 py-2 rounded-full shadow-lg text-blue-600 font-semibold"
        >
          <Home size={18} />
          Premium Property Listings
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-4xl md:text-6xl font-black text-gray-900 mt-6"
        >
          Discover Your
          <span className="text-blue-600"> Perfect Home</span>
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-8"
        >
          Search, filter, compare, and book luxury villas, premium apartments,
          rental homes, and investment-ready properties.
        </motion.p>
      </section>

      {/* SEARCH + FILTER BOX */}

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] shadow-2xl p-6 border border-white/40">
          {/* SEARCH */}

          <div className="relative mb-6">
            <Search className="absolute top-4 left-4 text-gray-400" />

            <input
              type="text"
              name="keyword"
              placeholder="Search by city, location or property name..."
              value={filters.keyword}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-blue-200 bg-white"
            />
          </div>

          {/* FILTERS */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              name="purpose"
              value={filters.purpose}
              onChange={handleChange}
              className="p-4 rounded-2xl border outline-none bg-white"
            >
              <option value="">Buy / Rent</option>
              <option value="sale">Buy</option>
              <option value="rent">Rent</option>
            </select>

            <select
              name="type"
              value={filters.type}
              onChange={handleChange}
              className="p-4 rounded-2xl border outline-none bg-white"
            >
              <option value="">Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Farm House">Farm House</option>
            </select>

            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
              className="p-4 rounded-2xl border outline-none bg-white"
            >
              <option value="">Bedrooms</option>
              <option value="1">1+ BHK</option>
              <option value="2">2+ BHK</option>
              <option value="3">3+ BHK</option>
              <option value="4">4+ BHK</option>
            </select>

            <select
              name="sort"
              value={filters.sort}
              onChange={handleChange}
              className="p-4 rounded-2xl border outline-none bg-white"
            >
              <option value="latest">Latest</option>
              <option value="priceLow">Price Low to High</option>
              <option value="priceHigh">Price High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* PRICE FILTER */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="relative">
              <IndianRupee
                size={18}
                className="absolute left-4 top-5 text-gray-400"
              />

              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-4 rounded-2xl border outline-none bg-white"
              />
            </div>

            <div className="relative">
              <IndianRupee
                size={18}
                className="absolute left-4 top-5 text-gray-400"
              />

              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-4 rounded-2xl border outline-none bg-white"
              />
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 bg-black text-white rounded-2xl font-semibold hover:bg-gray-800 transition py-4"
            >
              <RotateCcw size={18} />
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* COUNT */}

      <div className="max-w-7xl mx-auto px-6 mt-8 flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Available Properties
        </h2>

        <div className="flex items-center gap-2 text-gray-600 font-medium bg-white px-5 py-3 rounded-2xl shadow">
          <MapPin size={18} />
          {filteredProperties.length} properties found
        </div>
      </div>

      {/* GRID */}

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-[420px] rounded-[30px] bg-white/60 animate-pulse"
              ></div>
            ))}
          </div>
        ) : paginated.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-10"
          >
            {paginated.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <PropertyCard property={item} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="bg-white/80 rounded-[30px] shadow-xl py-20 text-center">
            <h2 className="text-3xl font-bold text-gray-700">
              No Properties Found 😔
            </h2>

            <p className="text-gray-500 mt-4">
              Try changing location, price, type or filters.
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}

      {filteredProperties.length > limit && (
        <div className="flex justify-center items-center gap-5 pb-16">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition disabled:opacity-40"
          >
            ← Previous
          </button>

          <div className="bg-white px-6 py-3 rounded-2xl shadow-lg font-bold">
            {page} / {totalPages}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}