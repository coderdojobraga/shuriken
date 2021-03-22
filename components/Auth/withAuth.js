import { useRouter } from "next/router";
import { useAuth } from "./useAuth";

export function withAuth(WrappedComponent) {
  return (props) => {
    const router = useRouter();
    const { user } = useAuth();

    if (user) {
      return <WrappedComponent {...props} />;
    } else {
      router.replace("/login");
      return null;
    }
  };
}
