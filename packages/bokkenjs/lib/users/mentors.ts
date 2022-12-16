import { API } from "../api";

export async function getMentor(id: string) {
  const response = await API.get(`/api/mentors/${id}`);

  return response.data;
}

export async function list_mentors() {
  const response = await API.get(`/api/mentors`);

  return response.data;
}
