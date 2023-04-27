import React, { FC, PropsWithChildren, createContext, useState } from "react";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";
import { getTheme, ThemeMode, setTheme } from "../utils/getTheme";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(getTheme());
  const colorMode = {
    toggleColorMode: () => {
      setMode(setTheme);
    },
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.default } }} />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CustomThemeProvider;
