import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useThunkDispatch } from "../../core/store/store";
import { fetchAlbums, fetchAlbumsSelector } from "../../core/store/albumsSlice";
import { StatusOfRequestEnum } from "../../core/types/enums/StatusOfRequestEnum";
import { Wrapper } from "../../containers/wrapper/Wrapper";
import { Typography, ImageList, ImageListItem, ImageListItemBar, Button } from "@mui/material";

const AlbumsPage = () => {
  const navigate = useNavigate();
  const dispatch = useThunkDispatch();
  const { data: albums, status, error } = useSelector(fetchAlbumsSelector);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);

  return (
    <Wrapper>
      <Typography variant="h4" color="text.primary">
        Albums
      </Typography>
      <ImageList gap={40} sx={{ width: 700 }}>
        {albums.map((item) => (
          <ImageListItem key={item.id}>
            <img src="https://via.placeholder.com/150/d32776" alt={item.title} loading="lazy" />
            <Typography color="text.primary">{item.title}</Typography>
            <Typography color="text.primary">17 photos</Typography>
            <Button
              variant="contained"
              sx={{ width: "150px" }}
              onClick={() => navigate(`/albums/${item.id}`)}
            >
              Go to album
            </Button>
          </ImageListItem>
        ))}
      </ImageList>
    </Wrapper>
  );
};

export default AlbumsPage;
