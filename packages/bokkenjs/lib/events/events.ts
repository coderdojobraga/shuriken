import { API } from "../api";

export async function createEvent(values: any) {
  const data = new FormData();

  for (const key in values) {
    if (!values["event[online]"]) {
      data.append("event[online]", "false");
    }

    if (!values[key]) continue;

    switch (key) {
      case "event[start_time]":
        data.append(key, values[key].toISOString());
        break;

      case "event[end_time]":
        data.append(key, values[key].toISOString());
        break;

      case "event[enrollments_open]":
        data.append(key, values[key].toISOString());
        break;

      case "event[enrollments_close]":
        data.append(key, values[key].toISOString());
        break;

      default:
        data.append(key, values[key]);
        break;
    }
  }

  const response = await API.post("/api/events", data, { headers: undefined });

  return response.data;
}

export async function list_events() {
  const response = await API.get(`/api/events`);

  return response.data;
}
