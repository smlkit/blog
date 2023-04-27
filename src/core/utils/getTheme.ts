export type ThemeMode = "light" | "dark";

export const getTheme = (): ThemeMode => {
  const theme = localStorage.getItem("theme");
  return theme === "light" || theme === "dark" ? theme : "light";
};

export const setTheme = (prevMode: ThemeMode): ThemeMode => {
  const nextTheme = prevMode === "light" ? "dark" : "light";
  localStorage.setItem("theme", nextTheme);
  return nextTheme;
};
