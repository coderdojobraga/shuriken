import { API } from "../api";

export async function getLocations() {
  const response = await API.get("/api/locations");

  return response.data;
}
