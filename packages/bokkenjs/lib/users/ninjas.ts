import { API } from "../api";

export async function getNinja(id: string) {
  const response = await API.get(`/api/ninjas/${id}`);

  return response.data;
}

export async function getNinjas() {
  const response = await API.get(`/api/ninjas/`);

  return response.data;
}

export async function getNinjaEvents(id: string) {
  const response = await API.get(`/api/events/${id}/ninjas`);

  return response.data;
}

export async function createNinja(values: any) {
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

export async function updateNinja(ninja_id: string, values: any) {
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

export async function notify_selected() {
  const response = await API.post(`/api/notify_selected/`);

  return response.data;
}

export async function notify_signup() {
  const response = await API.post(`/api/notify_signup/`);

  return response.data;
}
