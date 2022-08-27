import { useQuery } from "react-query";
import { API } from "bokkenjs";

export function useBadges() {
  return useQuery("badges", async () => {
    const {
      data: { data: badges },
    } = await API.get("/api/badges");

    return badges;
  });
}
