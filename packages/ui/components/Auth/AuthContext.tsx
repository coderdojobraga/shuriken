import { createContext } from "react";
import { IAuthContext } from "./types";

const AuthContext = createContext<null | IAuthContext>(null);

export default AuthContext;
