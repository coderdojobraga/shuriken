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
        data.append(key, values[key].toISOString())
        break;

      case "event[end_time]":
        data.append(key, values[key].toISOString())
        break;

      case "event[enrollments_open]":
        data.append(key, values[key].toISOString())
        break;

      case "event[enrollments_close]":
        data.append(key, values[key].toISOString())
        break;
        
      default:
        data.append(key, values[key]);
        break;
    }
  }

  data.append("event[team_id]", "b49a792d-cc13-43aa-b793-09d52b998241");
  data.append("event[location_id]", "e7604616-bc62-48da-bff5-7317b5b78376");

  const response = await API.post("/api/events", data, { headers: undefined });

  return response.data;
}
