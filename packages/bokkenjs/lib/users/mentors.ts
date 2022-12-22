import { API } from "../api";

export async function getMentor(id: string) {
  const response = await API.get(`/api/mentors/${id}`);

  return response.data;
}

export async function listMentors() {
  const response = await API.get(`/api/mentors`);

  return response.data;
}
