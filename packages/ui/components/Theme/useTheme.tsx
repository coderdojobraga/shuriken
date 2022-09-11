import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { IThemeContext } from "./types";

export function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("Missing theme context");
  }

  return context;
}
