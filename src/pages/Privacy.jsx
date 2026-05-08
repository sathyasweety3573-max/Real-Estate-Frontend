import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-pink-50 to-blue-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-5 py-16">
        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] shadow-2xl p-8 md:p-12 border border-white/40">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Privacy Policy 🔒
          </h1>

          <p className="text-gray-500 mt-5 text-lg leading-8">
            Your privacy and personal information are very
            important to us at Lidharshana Homez.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-blue-600">
                1. Data Collection
              </h2>

              <p className="text-gray-600 mt-3 leading-8">
                We collect only necessary information such as
                name, email, and booking details to improve
                your experience.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-purple-600">
                2. Secure Storage
              </h2>

              <p className="text-gray-600 mt-3 leading-8">
                Your information is stored securely using
                protected technologies and secure databases.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-pink-600">
                3. No Data Sharing
              </h2>

              <p className="text-gray-600 mt-3 leading-8">
                We do not sell or share your personal data
                with third parties without your permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-green-600">
                4. User Protection
              </h2>

              <p className="text-gray-600 mt-3 leading-8">
                We continuously improve our platform security
                to protect users from unauthorized access.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-orange-600">
                5. Contact Support
              </h2>

              <p className="text-gray-600 mt-3 leading-8">
                If you have any privacy concerns, please
                contact our support team anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}