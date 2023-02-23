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

export async function updateNinjaAsAdmin(values: any) {
  const data = Object.assign({}, values);

  const response = await API.post("api/admin/ninjas", data, {
    headers: undefined,
  });

  return response.data;
}

export async function getGuardiansAsAdmin() {
  const response = await API.get(`/api/admin/guardians`);

  return response.data;
}

export async function updateGuardianAsAdmin(values: any) {
  const data = Object.assign({}, values);

  const response = await API.post("api/admin/guardians", data, {
    headers: undefined,
  });

  return response.data;
}
