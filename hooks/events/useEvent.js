import { useQuery } from "react-query";
import API from "~/lib/api";

export function useEvent(id) {
  return useQuery(["events", id], async () => {
    const {
      data: { data: event },
    } = await API.get(`/api/events/${id}`);

    return event;
  });
}
