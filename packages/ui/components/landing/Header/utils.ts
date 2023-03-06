import { IUser } from "bokkenjs";

const getFirstChar = (text: string | undefined): string => {
  if (text === undefined) return "";

  return text[0];
};

export const getUserInitials = (user: IUser) =>
  getFirstChar(user?.first_name) + getFirstChar(user?.last_name);
