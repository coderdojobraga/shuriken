import { IUser } from "bokkenjs";
export type IErrors = {};

export interface IAuthContext {
  user?: IUser;
  isLoading: boolean;
  errors?: IErrors;
  login: (args: { email: string; password: string }) => void;
  sign_up: (args: { email: string; password: string; role: any }) => void;
  logout: () => void;
  edit_user: (args: any) => void;
}
