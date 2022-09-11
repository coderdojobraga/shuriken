import { API } from "../api";

export async function getMentor(id: string) {
  const response = await API.get(`/api/mentors/${id}`);

  return response.data;
}
