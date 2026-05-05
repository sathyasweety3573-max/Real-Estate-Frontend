import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../services/api";

export default function Contact() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: user?.user?.name || "",
    email: user?.user?.email || "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast.error("Name, email and message are required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/contact", form);

      toast.success(res.data.message || "Message sent successfully ✅");

      setForm({
        name: user?.user?.name || "",
        email: user?.user?.email || "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 overflow-hidden">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white/60 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/40 p-10 md:p-14"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
            Contact <span className="text-blue-600">Lidharshana Homez</span> 📞
          </h1>

          <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-9">
            We are always ready to help you find luxury villas, premium
            apartments, and your perfect dream property.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/70 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/40 p-8 md:p-10"
          >
            <h2 className="text-4xl font-bold text-gray-800">
              Get In Touch ✨
            </h2>

            <p className="mt-8 text-gray-600 text-lg leading-9">
              Our expert real estate team helps customers discover dream homes
              with trusted guidance and smooth booking experiences.
            </p>

            <div className="mt-12 space-y-8">
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-blue-600">📍 Address</h3>
                <p className="text-gray-600 mt-3 text-lg">
                  Chennai, Tamil Nadu, India
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-pink-600">📧 Email</h3>
                <p className="text-gray-600 mt-3 text-lg break-all">
                  support@lidharshanahomez.com
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-green-600">📱 Phone</h3>
                <p className="text-gray-600 mt-3 text-lg">+91 9876543210</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/70 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/40 p-8 md:p-10"
          >
            <h2 className="text-4xl font-bold text-purple-700">
              Send Message 💌
            </h2>

            <p className="mt-5 text-gray-500 text-lg">
              Feel free to contact us anytime
            </p>

            <div className="mt-10 space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-5 rounded-2xl border bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-5 rounded-2xl border bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="phone"
                placeholder="Enter mobile number"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-5 rounded-2xl border bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full p-5 rounded-2xl border bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                rows="6"
                name="message"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                className="w-full p-5 rounded-2xl border bg-white outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-2xl text-xl font-bold hover:scale-[1.02] transition duration-300 shadow-xl disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message 🚀"}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-20 bg-white/60 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/40 p-10 md:p-12 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose Us? 🏡
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-4xl">🏠</h3>
              <h4 className="text-2xl font-bold mt-4">Premium Homes</h4>
              <p className="text-gray-600 mt-4 leading-7">
                Discover luxury villas and modern apartments easily.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-4xl">🤝</h3>
              <h4 className="text-2xl font-bold mt-4">Trusted Support</h4>
              <p className="text-gray-600 mt-4 leading-7">
                Friendly expert agents ready to guide you anytime.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-4xl">⚡</h3>
              <h4 className="text-2xl font-bold mt-4">Fast Booking</h4>
              <p className="text-gray-600 mt-4 leading-7">
                Smooth and secure property booking experience.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}