import React, { FC, PropsWithChildren, createContext, useState } from "react";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = {
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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
