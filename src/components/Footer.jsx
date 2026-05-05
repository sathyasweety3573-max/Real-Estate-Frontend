import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black text-white mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 text-center">
        <h2 className="text-2xl font-bold">
          🏡 Lidharshana Homez
        </h2>

        <p className="mt-3 text-gray-400">
          Find your dream home with ease and trust.
        </p>

        <p className="mt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Lidharshana Homez. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}