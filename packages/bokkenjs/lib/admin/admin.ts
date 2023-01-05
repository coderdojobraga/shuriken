import { API } from "../api";

export async function getMentorsAsAdmin() {
  const response = await API.get(`/api/admin/mentors`);

  return response.data;
}

export async function updateUserAsAdmin(values: any) {
  const data = Object.assign({}, values);

  const response = await API.post("api/admin/mentor", data, {
    headers: undefined,
  });

  return response.data;
}
