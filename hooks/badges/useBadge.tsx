import { useQuery } from "react-query";
import API from "~/lib/api";

export function useBadge(id: string, preloads: Array<"ninjas"> = []) {
  return useQuery(["badges", id], async () => {
    const {
      data: { data: badge },
    } = await API.get(`/api/badges/${id}`);

    return preloads.reduce(async (state, preload) => {
      switch (preload) {
        case "ninjas":
          const {
            data: { data: ninjas },
          } = await API.get(`/api/badges/${id}/ninjas`);

          return { ...state, ninjas };
        default:
          throw new Error(`Unknown preload: ${preload}`);
      }
    }, badge);
  });
}
