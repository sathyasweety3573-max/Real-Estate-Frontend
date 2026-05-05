import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 leading-8">
          This platform is for browsing and booking properties.
          Users must provide valid information.
        </p>
      </div>

      <Footer />
    </>
  );
}