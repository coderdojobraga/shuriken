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

    switch (key) {
      case "user[photo]":
        data.append(key, values[key].file);
        break;

      case "user[birthday]":
        data.append(key, values[key].format("YYYY-MM-DD"));
        break;

      default:
        data.append(key, values[key]);
        break;
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

export async function getNinjas() {
  const response = await API.get(`/api/ninjas/`);

  return response.data;
}

export async function getUserByType({ id, type }) {
  switch (type) {
    case USER.ROLES.GUARDIAN:
      return getGuardian(id);
    case USER.ROLES.MENTOR:
      return getMentor(id);
    case USER.ROLES.NINJA:
      return getNinja(id);
    default:
      throw new Error(`Unknown USER TYPE: ${type}`);
  }
}

export async function registerUser(values) {
  const data = new FormData();

  for (const key in values) {
    if (!values[key]) continue;

    switch (key) {
      case "user[photo]":
        data.append(key, values[key].file);
        break;

      case "user[birthday]":
        data.append(key, values[key].format("YYYY-MM-DD"));
        break;

      case "user[socials]":
        for (const social of values[key]) {
          data.append(`${key}[${social.name}][name]`, social.name);
          data.append(`${key}[${social.name}][username]`, social.username);
        }
        break;

      default:
        data.append(key, values[key]);
        break;
    }
  }

  const response = await API.post("/api/auth/me", data, { headers: undefined });

  return response.data;
}

export async function addMentorSkills(mentor_id, skill_id) {
  const response = await API.post(`/api/mentors/${mentor_id}/skills`, {
    skill: skill_id,
  });

  return response.data;
}

export async function getMentorSkills(mentor_id) {
  const response = await API.get(`/api/mentors/${mentor_id}/skills`);
  return response.data;
}

export async function deleteMentorSkills(mentor_id, skill_id) {
  const response = await API.delete(
    `/api/mentors/${mentor_id}/skills/${skill_id}`
  );

  return response.data;
}

export async function createNinja(values) {
  const data = new FormData();

  for (const key in values) {
    if (!values[key]) continue;

    switch (key) {
      case "ninja[photo]":
        data.append(key, values[key].file);
        break;

      case "ninja[birthday]":
        data.append(key, values[key].format("YYYY-MM-DD"));
        break;

      default:
        data.append(key, values[key]);
        break;
    }
  }

  const response = await API.post("/api/ninjas", data, { headers: undefined });

  return response.data;
}

export async function updateNinja(ninja_id, values) {
  const data = new FormData();

  for (const key in values) {
    if (!values[key]) continue;

    switch (key) {
      case "ninja[photo]":
        data.append(key, values[key].file);
        break;

      case "ninja[birthday]":
        data.append(key, values[key].format("YYYY-MM-DD"));
        break;

      default:
        data.append(key, values[key]);
        break;
    }
  }

  const response = await API.put(`/api/ninjas/${ninja_id}`, data, {
    headers: undefined,
  });

  return response.data;
}

export async function getNinjaBadges(ninja_id) {
  const response = await API.get(`/api/ninjas/${ninja_id}/badges`);

  return response.data;
}

export async function getNinjaFiles(ninja_id) {
  const response = await API.get(`/api/ninjas/${ninja_id}/files`);

  return response.data;
}

export async function getNinjaLectures(ninja_id) {
  const response = await API.get(`/api/lectures?ninja_id=${ninja_id}`);

  return response.data;
}

export async function getMentorLectures(mentor_id) {
  const response = await API.get(`/api/lectures?mentor_id=${mentor_id}`);

  return response.data;
}

export async function getLecture(lecture_id) {
  const response = await API.get(`/api/lectures/${lecture_id}`);

  return response.data;
}

export async function updateLecture(lecture_id, data) {
  const response = await API.put(
    `/api/lectures/${lecture_id}`,
    {
      lecture: {
        summary: data.summary,
        notes: data.notes,
      },
    },
    {
      headers: undefined,
    }
  );

  return response.data;
}

export async function addNinjaSkills(ninja_id, skill_id) {
  const response = await API.post(`/api/ninjas/${ninja_id}/skills`, {
    skill: skill_id,
  });

  return response.data;
}

export async function deleteNinjaSkills(ninja_id, skill_id) {
  const response = await API.delete(
    `/api/ninjas/${ninja_id}/skills/${skill_id}`
  );

  return response.data;
}

export async function getNinjaSkills(ninja_id) {
  const response = await API.get(`/api/ninjas/${ninja_id}/skills`);

  return response.data;
}

export async function getSkills() {
  const response = await API.get("/api/skills");

  return response.data;
}

export async function getEvents() {
  const response = await API.get("/api/events");

  return response.data;
}

export async function getFiles() {
  const response = await API.get("/api/files");

  return response.data;
}

export async function createFile(values) {
  const data = new FormData();

  for (const key in values) {
    if (!values[key]) continue;

    if (key == "file[document]") {
      data.append(key, values[key].file);
    } else {
      data.append(key, values[key]);
    }
  }

  const response = await API.post("/api/files", data, {
    headers: undefined,
  });

  return response.data;
}

export async function editFile(id, data) {
  const response = await API.put(`/api/files/${id}`, { file: data });

  return response.data;
}

export default API;
