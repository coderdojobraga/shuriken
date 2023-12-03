import { API } from "../api";

export async function getSkills() {
  const response = await API.get("/api/skills");

  return response.data;
}

// Mentors
export async function getMentorSkills(mentor_id: string) {
  const response = await API.get(`/api/mentors/${mentor_id}/skills`);
  return response.data;
}

export async function addMentorSkills(mentor_id: string, skill_id: string) {
  const response = await API.post(`/api/mentors/${mentor_id}/skills`, {
    skill: skill_id,
  });

  return response.data;
}

export async function deleteMentorSkills(mentor_id: string, skill_id: string) {
  const response = await API.delete(
    `/api/mentors/${mentor_id}/skills/${skill_id}`
  );

  return response.data;
}

// Ninjas
export async function getNinjaSkills(ninja_id: string) {
  const response = await API.get(`/api/ninjas/${ninja_id}/skills`);

  return response.data;
}

export async function addNinjaSkills(ninja_id: string, skill_id: string) {
  const response = await API.post(`/api/ninjas/${ninja_id}/skills`, {
    skill: skill_id,
  });

  return response.data;
}

export async function deleteNinjaSkills(ninja_id: string, skill_id: string) {
  const response = await API.delete(
    `/api/ninjas/${ninja_id}/skills/${skill_id}`
  );

  return response.data;
}
