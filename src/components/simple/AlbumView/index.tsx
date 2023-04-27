import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip, Card, CardContent, CardActions, CardMedia, Typography, Box } from "@mui/material";

const AlbumView: FC<{ photoUrl: string; title: string; id: number }> = ({ photoUrl, title, id }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 320 }} variant="outlined">
      <Tooltip title={title} placement="top">
        <Box>
          <CardMedia component="img" height="140" image={photoUrl} alt="" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              album #{id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, eius atque ut enim magnam a
              quaerat.
            </Typography>
          </CardContent>
        </Box>
      </Tooltip>

      <CardActions>
        <Button size="small" color="primary" onClick={() => navigate(`/albums/${id}`)}>
          View album
        </Button>
      </CardActions>
    </Card>
  );
};

export default AlbumView;
