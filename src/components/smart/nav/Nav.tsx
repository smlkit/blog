import React, { useContext } from "react";
import { StyledLink } from "./StyledLink";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavBar } from "../../../containers/navbar/Navbar";
import { MUISwitch } from "../../ui/ThemeSwitch";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import { ColorModeContext } from "../../../core/theme/CustomThemeProvider";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const toggleTheme = useContext(ColorModeContext);

  const goToPage = () => {
    navigate(`/add-post`);
  };

  return (
    <>
      <NavBar>
        <Stack width={500}>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledLink to="/">
              <Typography color="primary.dark">Home</Typography>
            </StyledLink>

            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;

              return last ? (
                <Typography color="primary" key={to}>
                  {value}
                </Typography>
              ) : (
                <StyledLink color="primary" to={to} key={to}>
                  <Typography color="primary.dark">{value}</Typography>
                </StyledLink>
              );
            })}
          </Breadcrumbs>
        </Stack>
        <Stack direction="row" width={200} gap={4}>
          <MUISwitch onClick={() => toggleTheme.toggleColorMode()}></MUISwitch>
          <Button variant="outlined" onClick={goToPage}>
            New post
          </Button>
        </Stack>
      </NavBar>
      <Outlet />
    </>
  );
};

export default Nav;
