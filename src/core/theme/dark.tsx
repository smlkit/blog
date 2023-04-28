import { createTheme, ThemeOptions } from "@mui/material";

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      // main: "#00ADB5",
      main: "#7286D3",
    },
    secondary: {
      main: "#0F4C75",
    },
    background: {
      paper: "#222831",
      default: "#0E131A",
    },
    text: {
      primary: "#b5bcc7",
      secondary: "#6d737d",
    },
  },
};

export const darkTheme = createTheme(darkThemeOptions);
