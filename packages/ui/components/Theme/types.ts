export enum ETheme {
  Light = "light",
  Dark = "dark",
}

export interface IThemeContext {
  theme: ETheme;
  isDark: boolean;
  toggleTheme: () => void;
}
