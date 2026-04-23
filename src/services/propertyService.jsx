import API from "./api";

export const getProperties = () => API.get("/property");
export const getPropertyById = (id) => API.get(`/property/${id}`);