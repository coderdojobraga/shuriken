import {
  useEffect,
  useMemo,
  useState,
  PropsWithChildren,
  ReactNode,
} from "react";
import * as api from "bokkenjs";
import { IUser } from "bokkenjs";
import { IErrors } from "./types";
import AuthContext from "./AuthContext";

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: PropsWithChildren<Props>) {
  const [user, setUser] = useState<undefined | IUser>();
  const [errors, setErrors] = useState<any | IErrors>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isFirstLoading, setFirstLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    api
      .getCurrentUser()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => setLoading(false), 2000);
        setFirstLoading(false);
      });
  }, []);

  function login({ email, password }: { email: string; password: string }) {
    setLoading(true);

    api
      .login({ email, password })
      .then((user: any) => {
        setUser(user);
      })
      .catch((error: any) => setErrors(error))
      .finally(() => setLoading(false));
  }

  function sign_up({
    email,
    password,
    role,
  }: {
    email: string;
    password: string;
    role: any;
  }) {
    setLoading(true);

    api
      .sign_up({ email, password, role })
      .then((user: any) => {
        setUser(user);
      })
      .catch((error: any) => setErrors(error?.data?.errors))
      .finally(() => setLoading(false));
  }

  function logout() {
    setLoading(true);

    api
      .logout()
      .then(() => {
        setUser(undefined);
      })
      .catch((error: any) => setErrors(error?.data?.errors))
      .finally(() => setLoading(false));
  }

  function edit_user(values: any) {
    setLoading(true);
    console.log(values);

    api
      .editUser(values)
      .then((user: any) => setUser(user))
      .catch((error: any) => setErrors(error?.data?.errors))
      .finally(() => setLoading(false));
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
      edit_user,
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
