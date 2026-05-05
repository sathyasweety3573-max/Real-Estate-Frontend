import API from "./api";

// ================= GET ALL =================
export const getProperties = async () => {
  const res = await API.get("/property");
  return res.data; // direct data return
};

// ================= GET SINGLE =================
export const getPropertyById = async (id) => {
  const res = await API.get(`/property/${id}`);
  return res.data;
};

// ================= SEARCH =================
export const searchProperties = async (params) => {
  const res = await API.get("/property/search", {
    params,
  });
  return res.data;
};

// ================= FEATURED =================
export const getFeaturedProperties = async () => {
  const res = await API.get("/property/featured");
  return res.data;
};

// ================= TRENDING =================
export const getTrendingProperties = async () => {
  const res = await API.get("/property/trending");
  return res.data;
};