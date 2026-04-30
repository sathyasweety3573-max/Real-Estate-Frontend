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

  // ================= FETCH PROPERTIES =================

  useEffect(() => {

    getProperties()
      .then((res) => {

        console.log(res.data);

        setData(res.data);

      })

      .catch(() => {

        console.log(
          "Failed to load properties"
        );

      });

  }, []);

  // ================= SEARCH FILTER =================

  const filtered = data.filter((item) =>

    (item.location || "")
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

  );

  // ================= PAGINATION =================

  const start =
    (page - 1) * limit;

  const paginated =
    filtered.slice(
      start,
      start + limit
    );

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-blue-50
      to-purple-100
    ">

      <Navbar />

      {/* HERO SECTION */}

      <div className="
        text-center
        pt-16
        px-6
      ">

        <motion.h1
          initial={{
            opacity: 0,
            y: -40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            text-5xl
            md:text-5xl
            font-extrabold
            text-gray-900
          "
        >

          Find Your
          <span className="
            text-blue-600
          ">
            {" "}Dream Property
          </span>

        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="
            text-gray-600
            text-lg
            mt-5
            max-w-2xl
            mx-auto
          "
        >

          Explore premium villas,
          apartments, luxury homes,
          and modern living spaces.

        </motion.p>

      </div>

      {/* SEARCH BAR */}

      <div className="
        flex
        justify-center
        mt-12
        px-4
      ">

        <div className="
          relative
          w-full
          max-w-2xl
        ">

          <input
            placeholder="
              🔍 Search by location...
            "
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              px-6
              py-5
              rounded-3xl
              border
              border-white/40
              bg-white/70
              backdrop-blur-xl
              shadow-2xl
              outline-none
              text-lg
              focus:ring-4
              focus:ring-blue-300
            "
          />

        </div>

      </div>

      {/* PROPERTY COUNT */}

      <div className="
        text-center
        mt-8
      ">

        <p className="
          text-gray-600
          text-lg
          font-medium
        ">

          {filtered.length}
          {" "}Properties Found

        </p>

      </div>

      {/* PROPERTY GRID */}

      <motion.div

        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-10
          px-6
          md:px-10
          py-14
        "
      >

        {paginated.length > 0 ? (

          paginated.map((item) => (

            <motion.div

              key={item._id}

              whileHover={{
                y: -10,
              }}

              transition={{
                duration: 0.3,
              }}

              className="
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >

              <PropertyCard
                property={item}
              />

            </motion.div>

          ))

        ) : (

          <div className="
            col-span-full
            text-center
            text-2xl
            text-gray-500
            font-semibold
            py-20
          ">

            No properties found 😔

          </div>

        )}

      </motion.div>

      {/* PAGINATION */}

      <div className="
        flex
        justify-center
        items-center
        gap-6
        pb-16
      ">

        {/* PREV */}

        <button

          disabled={page === 1}

          onClick={() =>
            setPage(page - 1)
          }

          className="
            px-8
            py-4
            rounded-2xl
            text-white
            bg-gradient-to-r
            from-blue-500
            to-blue-700
            shadow-xl
            hover:scale-105
            transition
            disabled:opacity-40
          "
        >

          ← Previous

        </button>

        {/* PAGE NUMBER */}

        <div className="
          bg-white
          px-6
          py-3
          rounded-2xl
          shadow-lg
          font-bold
          text-gray-700
        ">

          Page {page}

        </div>

        {/* NEXT */}

        <button

          disabled={
            start + limit >=
            filtered.length
          }

          onClick={() =>
            setPage(page + 1)
          }

          className="
            px-8
            py-4
            rounded-2xl
            text-white
            bg-gradient-to-r
            from-purple-500
            to-purple-700
            shadow-xl
            hover:scale-105
            transition
            disabled:opacity-40
          "
        >

          Next →

        </button>

      </div>

    </div>
  );
}