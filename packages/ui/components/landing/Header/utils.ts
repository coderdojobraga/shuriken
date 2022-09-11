import { IUser } from "bokkenjs";

const getLastChar = (text: string | undefined): string => {
  if (text === undefined) return "";

  return text[0];
};

export const getUserInitials = (user: IUser) =>
  getLastChar(user?.first_name) + getLastChar(user?.last_name);
