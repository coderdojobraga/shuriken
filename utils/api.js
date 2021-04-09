import axios from "redaxios";

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

export async function getCurrentUser() {
  const response = await API.get("/api/auth/me");

  return response.data;
}

export async function logout() {
  const response = await API.delete("/api/auth/sign_out");

  return response.data;
}

export default API;
