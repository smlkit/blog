import { styled } from "@mui/material";

export const NavBar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  height: "60px",
}));
