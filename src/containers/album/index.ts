import { styled } from "@mui/material";

export const Album = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  justifyContent: "center",
  width: "320px",
  height: "320px",
  //   border: `1px solid ${theme.palette.text.secondary}`,
  //   backgroundColor: theme.palette.background.paper,
  borderRadius: "5px",
}));
