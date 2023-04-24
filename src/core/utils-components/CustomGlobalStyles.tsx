import React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { useTheme } from "@mui/material";

const CustomGlobalStyles = () => {
  const theme = useTheme();
  return <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.default } }} />;
};

export default CustomGlobalStyles;
