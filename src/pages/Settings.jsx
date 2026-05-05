import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Settings() {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">
          Settings
        </h1>

        <p className="text-gray-600">
          Manage your account settings here.
        </p>
      </div>

      <Footer />
    </>
  );
}