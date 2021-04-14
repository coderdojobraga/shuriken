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

export default API;
