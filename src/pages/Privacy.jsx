import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Privacy() {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 leading-8">
          We respect your privacy. Your data is safe and will not be shared.
        </p>
      </div>

      <Footer />
    </>
  );
}