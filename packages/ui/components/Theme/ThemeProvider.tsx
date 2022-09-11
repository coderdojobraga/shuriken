import { useEffect, useState, PropsWithChildren } from "react";
import { ETheme } from "./types";
import { ThemeContext } from "./ThemeContext";

interface Props {
  initialState?: ETheme;
}

export function ThemeProvider({
  initialState = ETheme.Light,
  children,
}: PropsWithChildren<Props>): any {
  const [theme, setTheme] = useState<ETheme>(initialState);

  const isDark = theme === ETheme.Dark;

  useEffect(() => {
    setTheme(localStorage.getItem("theme") as ETheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((mode) => (mode === ETheme.Light ? ETheme.Dark : ETheme.Light));
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
