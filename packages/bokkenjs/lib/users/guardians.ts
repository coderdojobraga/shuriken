import { API } from "../api";

export async function getGuardian(id: string) {
  const response = await API.get(`/api/guardians/${id}`);

  return response.data;
}

export async function listGuardians(id: string) {
  const response = await API.get(`/api/guardians/`);

  return response.data;
}
