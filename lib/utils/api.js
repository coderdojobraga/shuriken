import axios from "redaxios";
import * as USER from "./user";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function sign_up({ email, password, role }) {
  const response = await API.post("/api/auth/sign_up", {
    email,
    password,
    role,
  });

  return response.data;
}

export async function login({ email, password }) {
  const response = await API.post("/api/auth/sign_in", { email, password });

  return response.data;
}

export async function logout() {
  const response = await API.delete("/api/auth/sign_out");

  return response.data;
}

export async function getCurrentUser() {
  const response = await API.get("/api/auth/me");

  return response.data;
}

export async function editUser(values) {
  const data = new FormData();

  for (const key in values) {
    if (!values[key]) continue;

    if (key == "user[photo]") {
      data.append(key, values[key].file.originFileObj);
    } else {
      data.append(key, values[key]);
    }
  }

  const response = await API.put("/api/auth/me", data, {
    headers: undefined,
  });

  return response.data;
}

export async function verify_email(token) {
  const response = await API.post("/api/auth/verify", { token: token });

  return response.data;
}

export async function resend_confirmation_email() {
  const response = await API.post("/api/auth/resend");

  return response.status;
}

export async function getGuardian(id) {
  const response = await API.get(`/api/guardians/${id}`);

  return response.data;
}

export async function getMentor(id) {
  const response = await API.get(`/api/mentors/${id}`);

  return response.data;
}

export async function getNinja(id) {
  const response = await API.get(`/api/ninjas/${id}`);

  return response.data;
}

export async function getUserByType({ id, type }) {
  switch (type) {
    case USER.TYPES.GUARDIAN:
      return getGuardian(id);
    case USER.TYPES.MENTOR:
      return getMentor(id);
    case USER.TYPES.NINJA:
      return getNinja(id);
    default:
      throw new Error(`Unknown USER TYPE: ${type}`);
  }
}

export async function registerMentor({
  user_id,
  first_name,
  last_name,
  mobile,
  photo,
  // birthday,
  major,
}) {
  const config = {
    // Axios automatically adds relevant headers
    headers: undefined,
  };
  const form = new FormData();
  form.append("mentor[user_id]", user_id);
  form.append("mentor[first_name]", first_name);
  form.append("mentor[last_name]", last_name);
  form.append("mentor[mobile]", mobile);
  form.append("mentor[photo]", photo);
  form.append("mentor[major]", major);
  const response = await API.post("/api/mentors", form, config);

  return response.data;
}

export async function getBadges() {
  const response = await API.get("/api/badges");

  return response.data;
}

export async function getBadge(id) {
  const response = await API.get(`/api/badges/${id}`);

  return response.data;
}

export async function getBadgeNinjas(id) {
  const response = await API.get(`/api/badges/${id}/ninjas`);

  return response.data;
}

export async function getEvents() {
  const response = await API.get("/api/events");

  return response.data;
}

export default API;
