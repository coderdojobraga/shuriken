import { useRouter } from "next/router";
import { useAuth } from "@coderdojobraga/ui";

export function withAuth(WrappedComponent: any) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
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

    if (router.pathname !== "/inactive" && !user.active) {
      router.replace("/inactive");
      return null;
    }

    if (router.pathname !== "/register" && user.active && !user.registered) {
      router.replace("/register");
      return null;
    }

    if (user.active && router.pathname === "/inactive") {
      router.replace("/");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
