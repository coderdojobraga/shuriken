import { API } from "../api";

export async function getFiles() {
  const response = await API.get("/api/files");

  return response.data;
}

export async function createFile(values: any) {
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

export async function editFile(id: string, data: any) {
  const response = await API.put(`/api/files/${id}`, { file: data });

  return response.data;
}

export async function deleteFile(id: string) {
  const response = await API.delete(`/api/files/${id}`);

  return response.data;
}

export async function getNinjaFiles(ninja_id: string) {
  const response = await API.get(`/api/ninjas/${ninja_id}/files`);

  return response.data;
}
