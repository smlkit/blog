import React from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../../containers/wrapper";
import { Typography, Button, Stack } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Stack gap="40px" paddingTop="150px">
        <Stack textAlign="center">
          <Typography variant="h4" color="text.primary" gutterBottom>
            Welcome!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please choose what you want to do:
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" size="large" onClick={() => navigate(`/posts`)}>
            <Stack direction="row" gap="5px" alignItems="center">
              <DescriptionOutlinedIcon fontSize="small" />
              Browse posts
            </Stack>
          </Button>
          <Button variant="contained" size="large" onClick={() => navigate(`/albums`)}>
            <Stack direction="row" gap="5px" alignItems="center">
              <CameraAltOutlinedIcon fontSize="small" />
              Browse albums
            </Stack>
          </Button>
        </Stack>
      </Stack>
    </Wrapper>
  );
};

export default HomePage;
