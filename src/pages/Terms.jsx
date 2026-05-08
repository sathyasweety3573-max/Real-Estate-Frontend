import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-5 py-16">
        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] shadow-2xl p-8 md:p-12 border border-white/40">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Terms & Conditions 📄
          </h1>

          <p className="text-gray-500 mt-5 text-lg leading-8">
            Please read these terms carefully before using
            Lidharshana Homez platform.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-blue-600">
                1. Property Listings
              </h2>

              <p className="text-gray-600 mt-3 leading-8">
                All property details displayed on this platform
                are for informational purposes only and may
                change without notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-purple-600">
                2. User Responsibility
              </h2>

              <p className="text-gray-600 mt-3 leading-8">
                Users must provide correct personal information
                while booking or contacting property owners.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-pink-600">
                3. Booking Policy
              </h2>

              <p className="text-gray-600 mt-3 leading-8">
                Booking requests are subject to admin approval
                and property availability.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-green-600">
                4. Privacy & Security
              </h2>

              <p className="text-gray-600 mt-3 leading-8">
                We value your privacy and protect your data
                securely using modern technologies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}