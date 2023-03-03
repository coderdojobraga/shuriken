import { API } from "../api";

export async function getUsersAsAdmin() {
  const response = await API.get(`/api/admin/users`);

  return response.data;
}

export async function updateUserAsAdmin(id: any, params: any) {
  const response = await API.put(`api/admin/users/${id}`, params);

  return response.data;
}

export async function getMentorsAsAdmin() {
  const response = await API.get(`/api/admin/mentors`);

  return response.data;
}

export async function updateMentorAsAdmin(id: any, params: any) {
  const response = await API.put(`api/admin/mentors/${id}`, params);

  return response.data;
}

export async function getNinjasAsAdmin() {
  const response = await API.get(`/api/admin/ninjas`);

  return response.data;
}

export async function updateNinjaAsAdmin(id: any, params: any) {
  const response = await API.put(`api/admin/ninjas/${id}`, params);

  return response.data;
}

export async function getGuardiansAsAdmin() {
  const response = await API.get(`/api/admin/guardians`);

  return response.data;
}

export async function updateGuardianAsAdmin(id: any, params: any) {
  const response = await API.put(`api/admin/guardians/${id}`, params);

  return response.data;
}
