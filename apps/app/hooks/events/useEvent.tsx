import { useQuery } from "react-query";
import { API } from "bokkenjs";

export function useEvent(id: string) {
  return useQuery(["events", id], async () => {
    const {
      data: { data: event },
    } = await API.get(`/api/events/${id}`);

    return event;
  });
}
