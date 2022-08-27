import { API } from "../api";

export async function getNinjaBadges(ninja_id: string) {
  const response = await API.get(`/api/ninjas/${ninja_id}/badges`);

  return response.data;
}
