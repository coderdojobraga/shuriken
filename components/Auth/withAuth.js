import { useRouter } from "next/router";
import { useAuth } from "./useAuth";

export function withAuth(WrappedComponent) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const router = useRouter();
    const { user } = useAuth();

    if (!user) {
      router.replace("/login");
      return null;
    }

    if (router.pathname !== "/confirm" && !user.verified) {
      router.replace("/confirm");
      return null;
    }

    if (router.pathname !== "/register" && !user.registered) {
      router.replace("/register");
      return null;
    }

    if (!user.active) {
      router.replace("/inactive");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
