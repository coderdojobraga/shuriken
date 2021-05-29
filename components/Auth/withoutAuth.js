import { useRouter } from "next/router";
import { useAuth } from "./useAuth";
import * as USER from "~/lib/utils/user";

export function withoutAuth(WrappedComponent) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const router = useRouter();
    const { user } = useAuth();

    if (user) {
      if (user.registered) {
        switch (user.role) {
          case USER.TYPES.GUARDIAN:
            router.replace(`/profile/${user.role}/${user.guadian_id}`);
            break;
          case USER.TYPES.NINJA:
            router.replace(`/profile/${user.role}/${user.ninja_id}`);
            break;
          case USER.TYPES.MENTOR:
            router.replace(`/profile/${user.role}/${user.mentor_id}`);
            break;
          case USER.TYPES.ORGANIZER:
            router.replace(`/profile/${user.role}/${user.organizer_id}`);
            break;
        }
      } else {
        router.replace("/register");
      }
    }

    return <WrappedComponent {...props} />;
  };
}
