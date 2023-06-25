import { API } from "../api";

export async function getAvailabilities(event_id: string) {
  const response = await API.get(`/api/events/${event_id}/availabilities`);

  return response.data;
}

export async function getAvailableMentors(event_id: string) {
  const response = await API.get(`/api/events/${event_id}/availabilities`);

  return response.data;
}

export async function getUnavailableMentors(event_id: string) {
  const response = await API.get(`/api/events/${event_id}/availabilities`);

  return response.data;
}

export async function createAvailability(
  mentor_id: string,
  event_id: string,
  is_available: boolean,
  notes?: string
) {
  const response = await API.post(`/api/events/${event_id}/availabilities`, {
    availability: {
      mentor_id: mentor_id,
      event_id: event_id,
      is_available: is_available,
      notes: notes,
    },
  });

  return response.data;
}

export async function updateAvailability(
  id: string,
  mentor_id: string,
  event_id: string,
  is_available: boolean,
  notes?: string
) {
  const response = await API.put(
    `/api/events/${event_id}/availabilities/${id}`,
    {
      availability: {
        id: id,
        mentor_id: mentor_id,
        event_id: event_id,
        is_available: is_available,
        notes: notes,
      },
    }
  );

  return response.data.data;
}
