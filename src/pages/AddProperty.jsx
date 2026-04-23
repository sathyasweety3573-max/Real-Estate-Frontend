import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function AddProperty() {

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        return alert("Only Admin Can Add Property ❌");
      }

      /* IMAGE UPLOAD */

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

      /* SAVE PROPERTY */

      await API.post(
        "/property",
        {
          title,
          location,
          description,
          price,

          images: [imageUrl],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Property Added Successfully ✅");

      setTitle("");
      setLocation("");
      setDescription("");
      setPrice("");
      setFile(null);

    } catch (error) {

      console.log(error);

      alert("Upload Failed ❌");

    }

  };

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-blue-100
      via-white
      to-purple-100
      pt-32
    ">

      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          max-w-3xl
          mx-auto
          bg-white/80
          backdrop-blur-xl
          rounded-3xl
          shadow-2xl
          p-10
        "
      >

        <h1 className="
          text-5xl
          font-bold
          text-center
          mb-10
          bg-gradient-to-r
          from-blue-600
          to-purple-600
          bg-clip-text
          text-transparent
        ">
          Add Property 🏡
        </h1>

        {/* TITLE */}

        <input
          type="text"
          placeholder="Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full
            p-4
            rounded-2xl
            border
            mb-5
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {/* LOCATION */}

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="
            w-full
            p-4
            rounded-2xl
            border
            mb-5
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {/* PRICE */}

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="
            w-full
            p-4
            rounded-2xl
            border
            mb-5
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {/* DESCRIPTION */}

        <textarea
          rows="5"
          placeholder="Property Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="
            w-full
            p-4
            rounded-2xl
            border
            mb-5
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        ></textarea>

        {/* IMAGE */}

        <div className="
          border-2
          border-dashed
          rounded-2xl
          p-6
          text-center
          mb-6
          bg-gray-50
        ">

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

        </div>

        {/* BUTTON */}

        <button
          onClick={handleUpload}
          className="
            w-full
            py-4
            rounded-2xl
            text-white
            text-xl
            font-bold
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            shadow-xl
            hover:scale-105
            transition
            duration-300
          "
        >
          Upload Property 🚀
        </button>

      </motion.div>

    </div>

  );

}