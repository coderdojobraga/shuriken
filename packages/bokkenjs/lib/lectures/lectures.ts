import { API } from "../api";

export async function getLecture(lecture_id: string) {
  const response = await API.get(`/api/lectures/${lecture_id}`);

  return response.data;
}

export async function updateLecture(lecture_id: string, data: any) {
  const response = await API.put(
    `/api/lectures/${lecture_id}`,
    {
      lecture: {
        summary: data.summary,
        notes: data.notes,
        attendance: data.attendance,
      },
    },
    {
      headers: undefined,
    },
  );

  return response.data;
}

export async function getNinjaLectures(ninja_id: string) {
  const response = await API.get(`/api/lectures?ninja_id=${ninja_id}`);

  return response.data;
}

export async function getMentorLectures(mentor_id: string) {
  const response = await API.get(`/api/lectures?mentor_id=${mentor_id}`);

  return response.data;
}

export async function createLecture(values: any) {
  const data = new FormData();
  for (const key in values) {
    data.append(key, values[key]);
  }
  const response = await API.post("/api/lectures", data, {
    headers: undefined,
  });

  return response.data;
}

export async function listLectures() {
  const response = await API.get(`/api/lectures`);

  return response.data;
}

export async function deleteLecture(lecture_id: string) {
  const response = await API.delete(`/api/lectures/${lecture_id}`);

  return response.data;
}
