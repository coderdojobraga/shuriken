import { API } from "../api";

export async function getTeams() {
  const response = await API.get("/api/teams");

  return response.data;
}
