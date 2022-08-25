import { useQuery } from "react-query";
import API from "~/lib/api";

export function useEvents() {
  return useQuery("events", () =>
    API.get("/api/events").then((response) => response.data.data)
  );
}
