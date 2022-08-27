import { useQuery } from "react-query";
import { API } from "bokkenjs";

export function useEvents() {
  return useQuery("events", async () => {
    const {
      data: { data: events },
    } = await API.get("/api/events");

    return events;
  });
}
