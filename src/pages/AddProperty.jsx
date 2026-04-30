import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  // ================= ADD PROPERTY =================

  const handleUpload = async () => {
    if (
      !title ||
      !location ||
      !description ||
      !price ||
      !type ||
      !bedrooms ||
      !bathrooms ||
      !area ||
      !file
    ) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Only Admin Can Add Property ❌");
        return;
      }

      // ================= IMAGE UPLOAD =================

      const formData = new FormData();

      formData.append("file", file);

      const uploadRes = await API.post(
        "/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const imageUrl = uploadRes.data.url;

      // ================= SAVE PROPERTY =================

      await API.post(
        "/property",
        {
          title,
          location,
          description,
          price,
          type,
          bedrooms,
          bathrooms,
          area,
          images: [imageUrl],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Property Added Successfully ✅");

      // CLEAR FORM

      setTitle("");
      setLocation("");
      setDescription("");
      setPrice("");
      setType("");
      setBedrooms("");
      setBathrooms("");
      setArea("");
      setFile(null);

      navigate("/properties");
    } catch (error) {
      console.log(error);

      alert("Upload Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-blue-50
        to-purple-100
      "
    >
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            max-w-5xl
            mx-auto
            bg-white/80
            backdrop-blur-2xl
            rounded-[40px]
            shadow-2xl
            border
            border-white/40
            overflow-hidden
          "
        >
          {/* HEADER */}

          <div
            className="
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              p-10
              text-white
            "
          >
            <h1 className="text-5xl font-bold">
              Add New Property 🏡
            </h1>

            <p className="mt-4 text-lg text-blue-100">
              Upload premium property listings with
              complete details and images.
            </p>
          </div>

          {/* FORM */}

          <div className="p-10">

            {/* PROPERTY TITLE */}

            <div className="mb-6">
              <label className="font-semibold text-gray-700">
                Property Title
              </label>

              <input
                type="text"
                placeholder="Luxury Villa"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="
                  w-full
                  mt-2
                  p-4
                  rounded-2xl
                  border
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </div>

            {/* LOCATION + TYPE */}

            <div className="grid md:grid-cols-2 gap-6 mb-6">

              <div>
                <label className="font-semibold text-gray-700">
                  Location
                </label>

                <input
                  type="text"
                  placeholder="Chennai"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  className="
                    w-full
                    mt-2
                    p-4
                    rounded-2xl
                    border
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">
                  Property Type
                </label>

                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value)
                  }
                  className="
                    w-full
                    mt-2
                    p-4
                    rounded-2xl
                    border
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                >
                  <option value="">
                    Select Type
                  </option>

                  <option>
                    Apartment
                  </option>

                  <option>
                    Villa
                  </option>

                  <option>
                    Penthouse
                  </option>

                  <option>
                    Farm House
                  </option>
                </select>
              </div>

            </div>

            {/* PRICE + BEDROOMS */}

            <div className="grid md:grid-cols-3 gap-6 mb-6">

              <div>
                <label className="font-semibold text-gray-700">
                  Price
                </label>

                <input
                  type="number"
                  placeholder="2500000"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  className="
                    w-full
                    mt-2
                    p-4
                    rounded-2xl
                    border
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">
                  Bedrooms
                </label>

                <input
                  type="number"
                  placeholder="3"
                  value={bedrooms}
                  onChange={(e) =>
                    setBedrooms(e.target.value)
                  }
                  className="
                    w-full
                    mt-2
                    p-4
                    rounded-2xl
                    border
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">
                  Bathrooms
                </label>

                <input
                  type="number"
                  placeholder="2"
                  value={bathrooms}
                  onChange={(e) =>
                    setBathrooms(e.target.value)
                  }
                  className="
                    w-full
                    mt-2
                    p-4
                    rounded-2xl
                    border
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />
              </div>

            </div>

            {/* AREA */}

            <div className="mb-6">
              <label className="font-semibold text-gray-700">
                Area (sq.ft)
              </label>

              <input
                type="number"
                placeholder="2400"
                value={area}
                onChange={(e) =>
                  setArea(e.target.value)
                }
                className="
                  w-full
                  mt-2
                  p-4
                  rounded-2xl
                  border
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </div>

            {/* DESCRIPTION */}

            <div className="mb-6">
              <label className="font-semibold text-gray-700">
                Description
              </label>

              <textarea
                rows="6"
                placeholder="Describe property..."
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2
                  p-4
                  rounded-2xl
                  border
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              ></textarea>
            </div>

            {/* IMAGE */}

            <div
              className="
                border-2
                border-dashed
                border-blue-300
                rounded-3xl
                p-10
                text-center
                bg-blue-50
                mb-8
              "
            >
              <p className="text-lg font-semibold text-gray-700">
                Upload Property Image 📸
              </p>

              <input
                type="file"
                className="mt-5"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />

              {file && (
                <p className="mt-4 text-green-600">
                  Selected: {file.name}
                </p>
              )}
            </div>

            {/* BUTTON */}

            <button
              onClick={handleUpload}
              disabled={loading}
              className="
                w-full
                py-5
                rounded-3xl
                text-white
                text-xl
                font-bold
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                shadow-2xl
                hover:scale-[1.02]
                transition
                duration-300
                disabled:opacity-50
              "
            >
              {loading
                ? "Uploading..."
                : "Upload Property 🚀"}
            </button>

          </div>
        </motion.div>
      </div>
    </div>
  );
}