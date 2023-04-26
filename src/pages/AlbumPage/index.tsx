import React from "react";
import { useParams } from "react-router-dom";
import { Wrapper } from "../../containers/wrapper/Wrapper";
import { Typography } from "@mui/material";

const AlbumPage = () => {
  const { albumId } = useParams();
  return (
    <Wrapper>
      <Typography variant="h4" color="text.primary">
        Album #{albumId}
      </Typography>
    </Wrapper>
  );
};

export default AlbumPage;
