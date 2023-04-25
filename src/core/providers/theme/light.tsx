import { createTheme, ThemeOptions } from "@mui/material";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#00ADB5",
      contrastText: "#eeeeee",
    },
    secondary: {
      main: "#0F4C75",
    },
    background: {
      paper: "#e6ecf0",
    },
    text: {
      primary: "#52616B",
      secondary: "#6d737d",
    },
  },
};

export const lightTheme = createTheme(lightThemeOptions);
