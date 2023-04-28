import { createTheme, ThemeOptions } from "@mui/material";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      // main: "#00ADB5",
      main: "#7286D3",
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
      secondary: "#797f8a",
    },
  },
};

export const lightTheme = createTheme(lightThemeOptions);
