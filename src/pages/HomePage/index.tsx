import React from "react";
import { Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../../containers/wrapper/Wrapper";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
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
          Browse posts
        </Button>
        <Button variant="contained" size="large" onClick={() => navigate(`/albums`)}>
          Browse albums
        </Button>
      </Stack>
    </Wrapper>
  );
};

export default HomePage;
