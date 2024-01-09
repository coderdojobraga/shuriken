import { useQuery } from "react-query";
import { API } from "bokkenjs";

export function useEvents(order: string) {
  return useQuery("events", async () => {
    const {
      data: { data: events },
    } = await API.get("/api/events", {params: {order: order}});

    return events;
  });
}
