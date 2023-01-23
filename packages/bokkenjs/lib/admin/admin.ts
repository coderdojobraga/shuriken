import { API } from "../api";

export async function getUsersAsAdmin() {
  const response = await API.get(`/api/admin/users`);

  return response.data;
}

export async function updateUserAsAdmin(values: any) {
  const data = Object.assign({}, values);

  const response = await API.post("api/admin/user", data, {
    headers: undefined,
  });

  return response.data;
}

export async function getMentorsAsAdmin() {
  const response = await API.get(`/api/admin/mentors`);

  return response.data;
}

export async function updateMentorAsAdmin(values: any) {
  const data = Object.assign({}, values);

  const response = await API.post("api/admin/mentor", data, {
    headers: undefined,
  });

  return response.data;
}

export async function getNinjasAsAdmin() {
  const response = await API.get(`/api/admin/ninjas`);

  return response.data;
}

export async function updateNinjaAsAdmin(values: any) {
  const data = Object.assign({}, values);

  const response = await API.post("api/admin/ninja", data, {
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

  const response = await API.post("api/admin/guardian", data, {
    headers: undefined,
  });

  return response.data;
}
