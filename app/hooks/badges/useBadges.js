import { useQuery } from "react-query";
import API from "@lib/api";

export function useBadges() {
  return useQuery("badges", () =>
    API.get("/api/badges").then((response) => response.data.data)
  );
}
