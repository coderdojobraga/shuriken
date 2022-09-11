import { useContext } from "react";
import AuthContext from "./AuthContext";
import { IAuthContext } from "./types";

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Missing auth context");
  }

  return context;
}
