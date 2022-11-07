import { API } from "../api";

export async function getEnrolledNinjas(event_id: string) {
  const response = await API.get(`/api/events/${event_id}/enrollments`);

  return response.data;
}

export async function createEnrollment(
  ninja_id: string,
  event_id: string,
  accepted: boolean
) {
  const response = await API.post(`/api/events/${event_id}/enrollments`, {
    enrollment: {
      ninja_id: ninja_id,
      event_id: event_id,
      accepted: accepted,
    },
  });

  return response.data;
}
