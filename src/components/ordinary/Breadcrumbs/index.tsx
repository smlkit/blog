import React from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { StyledLink } from "../../smart/nav/StyledLink";

const BreadcrumbsComponent = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const homename = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <StyledLink to="/">
        <Typography color="text.secondary">{homename}</Typography>
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
            <Typography color="text.secondary">{value}</Typography>
          </StyledLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
