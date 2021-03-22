import { createContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import * as api from "../../utils/api.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isFirstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    api
      .getCurrentUser()
      .then((user) => setUser(user))
      .catch(() => {})
      .finally(() => setFirstLoading(false));
  }, []);

  function login({ email, password }) {
    setLoading(true);

    api
      .login({ email, password })
      .then(() => {
        api.getCurrentUser().then((user) => setUser(user));
        router.push("/profile");
      })
      .catch((error) => setErrors(error?.data?.errors))
      .finally(() => setLoading(false));
  }

  function sign_up({ email, password, role }) {
    setLoading(true);

    api
      .sign_up({ email, password, role })
      .then(() => {
        api.getCurrentUser().then((user) => setUser(user));
        router.push("/profile");
      })
      .catch((error) => setErrors(error?.data?.errors))
      .finally(() => setLoading(false));
  }

  function logout() {
    api.logout().then(() => setUser(undefined));
  }

  // Make the provider update only when it should
  const values = useMemo(
    () => ({
      user,
      isLoading,
      errors,
      login,
      sign_up,
      logout,
    }),
    // eslint-disable-next-line
    [user, isLoading, errors]
  );

  return (
    <AuthContext.Provider value={values}>
      {!isFirstLoading && children}
    </AuthContext.Provider>
  );
}
