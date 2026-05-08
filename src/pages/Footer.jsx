import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🏡 Lidharshana Homez
          </h2>

          <p className="text-gray-400 mt-4 leading-7">
            Premium real estate platform for buying, renting, and booking dream
            homes.
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 w-11 h-11 rounded-full hover:bg-blue-600 transition flex items-center justify-center"
            >
              <span className="text-lg font-extrabold">f</span>
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 w-11 h-11 rounded-full hover:bg-pink-600 transition flex items-center justify-center"
            >
              <span className="text-lg font-extrabold">◎</span>
            </a>

            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 w-11 h-11 rounded-full hover:bg-sky-500 transition flex items-center justify-center"
            >
              <span className="text-lg font-extrabold">𝕏</span>
            </a>

            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 w-11 h-11 rounded-full hover:bg-red-600 transition flex items-center justify-center"
            >
              <span className="text-lg font-extrabold">▶</span>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-5">
            Quick Links
          </h3>

          <div className="space-y-3 text-gray-400">
            <Link to="/home" className="block hover:text-white">
              Home
            </Link>

            <Link to="/properties" className="block hover:text-white">
              Properties
            </Link>

            <Link to="/about" className="block hover:text-white">
              About
            </Link>

            <Link to="/contact" className="block hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-5">
            Legal
          </h3>

          <div className="space-y-3 text-gray-400">
            <Link to="/terms" className="block hover:text-white">
              Terms & Conditions
            </Link>

            <Link to="/privacy" className="block hover:text-white">
              Privacy Policy
            </Link>

            <Link to="/settings" className="block hover:text-white">
              Settings
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-gray-400">
            <p className="flex gap-3">
              <MapPin size={20} />
              Chennai, Tamil Nadu
            </p>

            <a
              href="mailto:support@lidharshanahomez.com"
              className="flex gap-3 hover:text-white break-all"
            >
              <Mail size={20} />
              support@lidharshanahomez.com
            </a>

            <a
              href="tel:+919876543210"
              className="flex gap-3 hover:text-white"
            >
              <Phone size={20} />
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-5 text-gray-400 px-4">
        © {new Date().getFullYear()} Lidharshana Homez. All rights reserved.
      </div>
    </footer>
  );
}