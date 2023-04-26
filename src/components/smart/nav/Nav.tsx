import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { Container } from "../../../containers/container";
import { NavBar } from "../../../containers/navbar/Navbar";
import { ColorModeContext } from "../../../core/theme/CustomThemeProvider";
import BreadcrumbsComponent from "../../ordinary/Breadcrumbs";
import { MUISwitch } from "../../ui/ThemeSwitch";

const Nav = () => {
  const navigate = useNavigate();
  const toggleTheme = useContext(ColorModeContext);

  const goToPage = () => {
    navigate(`/add-post`);
  };

  return (
    <>
      <NavBar>
        <Stack width={700} direction="row">
          <Stack direction="row" width={500} gap={0.5}>
            <img src={logo} alt="" style={{ width: "30px", height: "30px" }} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography fontWeight={600}>blog</Typography>
            </Box>
          </Stack>
          <Stack direction="row" width={200} gap={4}>
            <MUISwitch onClick={() => toggleTheme.toggleColorMode()}></MUISwitch>
            <Button variant="outlined" onClick={goToPage}>
              New post
            </Button>
          </Stack>
        </Stack>
      </NavBar>
      <Container>
        <Stack width={700} paddingTop={1}>
          <BreadcrumbsComponent />
        </Stack>
      </Container>
      <Outlet />
    </>
  );
};

export default Nav;
