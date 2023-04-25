import React from "react";
import { StyledLink } from "./StyledLink";
import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../core/styles/navbav/navbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";

const Nav = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
      <NavBar>
        <Stack width={700}>
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
      </NavBar>
      <Outlet />
    </>
  );
};

export default Nav;
