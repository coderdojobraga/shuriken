import { useRouter } from "next/router";
import { useAuth } from "@coderdojobraga/ui";

export function withoutAuth(WrappedComponent: any) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const router = useRouter();
    const { user } = useAuth();

    if (user) {
      if (user.registered) {
        router.replace(`/`);
      } else {
        router.replace("/register");
      }

      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
