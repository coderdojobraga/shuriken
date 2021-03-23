import { useRouter } from "next/router";
import { useAuth } from "./useAuth";
import * as USER from "~/lib/utils/user";
import LoadingLayout from "~/layouts/LoadingLayout";

export function withoutAuth(WrappedComponent) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const router = useRouter();
    const { user, isLoading } = useAuth();

    if (user) {
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
        default:
          router.replace("/register");
      }
    }

    if (isLoading || user) {
      return <LoadingLayout />;
    }

    return <WrappedComponent {...props} />;
  };
}
