import { useEffect, useState } from "react";
import { getProperties } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Properties() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
const limit = 6;

  useEffect(() => {
    getProperties().then((res) => {

  console.log(res.data);

  setData(res.data);

});
  }, []);

  const filtered = data.filter((item) =>
  (item.location || "").toLowerCase().includes(search.toLowerCase())
);

const start = (page - 1) * limit;
const paginated = filtered.slice(start, start + limit);

  return (
    <div>
      <Navbar />

<div className="flex justify-center mt-10">

  <input
    placeholder="🔍 Search location..."
    className="
      w-[400px]
      px-5
      py-3
      rounded-2xl
      border
      shadow-lg
      outline-none
      focus:ring-2
      focus:ring-blue-500
    "
    onChange={(e) => setSearch(e.target.value)}
  />

</div>

<div className="flex justify-center gap-5 mt-10">

  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="
      px-6 py-3
      rounded-2xl
      text-white
      bg-blue-600
      hover:bg-blue-700
      transition
      disabled:opacity-40
    "
  >
    ← Prev
  </button>

  <button
    disabled={start + limit >= filtered.length}
    onClick={() => setPage(page + 1)}
    className="
      px-6 py-3
      rounded-2xl
      bg-blue-600
      text-white
      hover:bg-blue-700
      transition
      disabled:opacity-40
    "
  >
    Next →
  </button>

</div>

      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-10
p-10
bg-gray-100
min-h-screen
"
>
  {paginated.map((item) => (
    <motion.div key={item._id} whileHover={{ scale: 1.05 }}
    className="shadow-md hover:shadow-xl transition">
      <PropertyCard property={item} />
    </motion.div>
  ))}
</motion.div>
    </div>
  );
}
