import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  UploadCloud,
  Building2,
  MapPin,
  IndianRupee,
  BedDouble,
  Bath,
  Maximize,
  FileText,
  Home,
} from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AddProperty() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = storedUser?.user || storedUser;
  const isAdmin = user?.role === "admin";

  const [form, setForm] = useState({
    title: "",
    location: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
    price: "",
    type: "",
    purpose: "sale",
    bedrooms: "",
    bathrooms: "",
    area: "",
    amenities: "",
    isFeatured: false,
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!isAdmin) {
      toast.error("Only admin can add property 🚫");
      return;
    }

    if (
      !form.title ||
      !form.location ||
      !form.description ||
      !form.price ||
      !form.type ||
      !form.purpose ||
      !form.bedrooms ||
      !form.bathrooms ||
      !form.area ||
      !file
    ) {
      toast.error("Please fill all required fields ❌");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = uploadRes.data.url;

      await API.post("/property", {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        area: Number(form.area),
        amenities: form.amenities
          ? form.amenities.split(",").map((item) => item.trim())
          : [],
        images: [imageUrl],
      });

      toast.success("Property Added Successfully ✅");

      navigate("/properties");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Upload Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-100">
        <Navbar />

        <div className="min-h-[80vh] flex items-center justify-center px-6">
          <div className="bg-white rounded-[35px] shadow-2xl p-10 text-center max-w-lg">
            <h1 className="text-4xl font-extrabold text-red-600">
              Access Denied 🚫
            </h1>

            <p className="mt-5 text-gray-600 leading-8">
              Only admin can add new properties. Normal users can browse and
              book properties.
            </p>

            <button
              onClick={() => navigate("/home")}
              className="mt-8 bg-black text-white px-8 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition"
            >
              Go Home
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-2xl rounded-[40px] shadow-2xl border border-white/40 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-10 text-white">
            <div className="flex items-center gap-4">
              <Home size={45} />

              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold">
                  Add New Property
                </h1>

                <p className="mt-3 text-blue-100 text-lg">
                  Admin panel for uploading premium property listings.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 p-6 md:p-10">
            <div>
              <div className="mb-6">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <Building2 size={18} />
                  Property Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Luxury Villa"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin size={18} />
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="Anna Nagar, Chennai"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full mt-2 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="Chennai"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full mt-2 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="font-semibold text-gray-700">
                    Property Type
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full mt-2 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Penthouse</option>
                    <option>Farm House</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-700">
                    Purpose
                  </label>

                  <select
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    className="w-full mt-2 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="font-semibold text-gray-700 flex items-center gap-2">
                    <IndianRupee size={18} />
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    placeholder="2500000"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full mt-2 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 flex items-center gap-2">
                    <BedDouble size={18} />
                    Bedrooms
                  </label>

                  <input
                    type="number"
                    name="bedrooms"
                    placeholder="3"
                    value={form.bedrooms}
                    onChange={handleChange}
                    className="w-full mt-2 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 flex items-center gap-2">
                    <Bath size={18} />
                    Bathrooms
                  </label>

                  <input
                    type="number"
                    name="bathrooms"
                    placeholder="2"
                    value={form.bathrooms}
                    onChange={handleChange}
                    className="w-full mt-2 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <Maximize size={18} />
                  Area sq.ft
                </label>

                <input
                  type="number"
                  name="area"
                  placeholder="2400"
                  value={form.area}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="font-semibold text-gray-700">
                  Amenities comma separated
                </label>

                <input
                  type="text"
                  name="amenities"
                  placeholder="Parking, Swimming Pool, Gym"
                  value={form.amenities}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6 flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                  className="w-5 h-5"
                />

                <label className="font-semibold text-gray-700">
                  Mark as Featured Property
                </label>
              </div>

              <div className="mb-6">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <FileText size={18} />
                  Description
                </label>

                <textarea
                  rows="6"
                  name="description"
                  placeholder="Describe property..."
                  value={form.description}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full py-5 rounded-3xl text-white text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl hover:scale-[1.02] transition disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Upload Property 🚀"}
              </button>
            </div>

            <div>
              <div className="border-2 border-dashed border-blue-300 rounded-[35px] p-8 bg-blue-50 text-center">
                <UploadCloud className="mx-auto text-blue-600" size={55} />

                <p className="mt-4 text-lg font-semibold text-gray-700">
                  Upload Property Image
                </p>

                <input
                  type="file"
                  accept="image/*"
                  className="mt-6"
                  onChange={handleFileChange}
                />

                {file && (
                  <p className="mt-4 text-green-600 font-medium">
                    Selected: {file.name}
                  </p>
                )}
              </div>

              <div className="mt-8 bg-white rounded-[35px] shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-5">
                  Live Preview
                </h2>

                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-72 w-full object-cover rounded-3xl shadow-lg"
                  />
                ) : (
                  <div className="h-72 rounded-3xl bg-gray-100 flex items-center justify-center text-gray-500">
                    Image preview will appear here
                  </div>
                )}

                <h3 className="mt-6 text-2xl font-bold">
                  {form.title || "Property Title"}
                </h3>

                <p className="text-gray-500 mt-2">
                  📍 {form.location || "Location"}
                </p>

                <p className="text-blue-600 font-bold text-xl mt-3">
                  ₹ {form.price || "0"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}