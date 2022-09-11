import { getGuardian } from "./guardians";
import { getNinja } from "./ninjas";
import { getMentor } from "./mentors";
import { EUser } from "./types";

export async function getUserByRole({ id, role }: { id: string; role: EUser }) {
  switch (role) {
    case EUser.Guardian:
      return getGuardian(id);
    case EUser.Mentor:
      return getMentor(id);
    case EUser.Ninja:
      return getNinja(id);
    default:
      throw new Error(`Unknown User Role: ${role}`);
  }
}
