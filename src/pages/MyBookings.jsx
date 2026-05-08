import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import API from "../services/api";

import {
  CalendarCheck,
  MapPin,
  BedDouble,
  Bath,
  IndianRupee,
  Phone,
  Mail,
  User,
  CheckCircle,
  Clock3,
  XCircle,
} from "lucide-react";

export default function MyBookings() {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchBookings =
      async () => {

        try {

          const res =
            await API.get(
              "/booking/my"
            );

          setBookings(
            res.data.bookings || []
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchBookings();

  }, []);

  const getStatusStyle = (
    status
  ) => {

    switch (status) {

      case "approved":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: (
            <CheckCircle size={18} />
          ),
        };

      case "rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: (
            <XCircle size={18} />
          ),
        };

      default:
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          icon: (
            <Clock3 size={18} />
          ),
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <h1 className="text-2xl font-bold">
          Loading Bookings...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-12">

        {/* TITLE */}

        <div className="mb-10">

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            My Bookings 🏡
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            View all your booked properties and approval status.
          </p>

        </div>

        {/* EMPTY */}

        {bookings.length === 0 ? (

          <div className="bg-white/80 backdrop-blur-xl rounded-[35px] shadow-2xl p-14 text-center border border-white/40">

            <div className="w-28 h-28 mx-auto rounded-full bg-green-100 flex items-center justify-center">

              <CalendarCheck
                size={50}
                className="text-green-600"
              />

            </div>

            <h2 className="text-3xl font-bold text-gray-800 mt-8">
              No Booking Properties
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              You have not booked any property yet.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {bookings.map(
              (booking) => {

                const property =
                  booking.property;

                const statusStyle =
                  getStatusStyle(
                    booking.status
                  );

                return (

                  <div
                    key={booking._id}
                    className="bg-white rounded-[35px] overflow-hidden shadow-2xl hover:scale-[1.02] transition"
                  >

                    <img
                      src={
                        property?.images?.[0] ||
                        "https://via.placeholder.com/500x300"
                      }
                      alt={
                        property?.title
                      }
                      className="w-full h-64 object-cover"
                    />

                    <div className="p-6">

                      <h2 className="text-2xl font-bold text-gray-800">
                        {
                          property?.title
                        }
                      </h2>

                      <p className="flex items-center gap-2 text-gray-500 mt-3">
                        <MapPin size={18} />

                        {
                          property?.location
                        }
                      </p>

                      <div className="flex gap-6 mt-5 text-gray-600">

                        <div className="flex items-center gap-2">
                          <BedDouble size={18} />

                          {
                            property?.bedrooms
                          }
                        </div>

                        <div className="flex items-center gap-2">
                          <Bath size={18} />

                          {
                            property?.bathrooms
                          }
                        </div>

                      </div>

                      <div className="mt-6 flex items-center gap-1 text-3xl font-extrabold text-blue-600">

                        <IndianRupee size={28} />

                        {Number(
                          property?.price || 0
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </div>

                      {/* USER DETAILS */}

                      <div className="mt-6 bg-slate-100 rounded-3xl p-5 space-y-4">

                        <div className="flex items-center gap-3 text-gray-700">

                          <User size={18} />

                          {booking.name}

                        </div>

                        <div className="flex items-center gap-3 text-gray-700 break-all">

                          <Mail size={18} />

                          {booking.email}

                        </div>

                        <div className="flex items-center gap-3 text-gray-700">

                          <Phone size={18} />

                          {booking.phone}

                        </div>

                      </div>

                      {/* STATUS */}

                      <div className="mt-6 flex justify-between items-center">

                        <span
                          className={`${statusStyle.bg} ${statusStyle.text} px-4 py-2 rounded-full font-semibold flex items-center gap-2`}
                        >

                          {
                            statusStyle.icon
                          }

                          {
                            booking.status
                          }

                        </span>

                        <span className="text-sm text-gray-500">

                          {new Date(
                            booking.createdAt
                          ).toLocaleDateString()}

                        </span>

                      </div>

                      {/* ADMIN MESSAGE */}

                      {booking.adminMessage && (

                        <div className="mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-4">

                          <p className="text-sm font-semibold text-blue-700">
                            Admin Message
                          </p>

                          <p className="text-gray-600 mt-2">
                            {
                              booking.adminMessage
                            }
                          </p>

                        </div>

                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>

    </div>
  );
}