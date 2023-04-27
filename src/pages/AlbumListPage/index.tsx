import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "../../core/store/store";
import { fetchAlbums, fetchAlbumsSelector } from "../../core/store/albumsSlice";
import { StatusOfRequestEnum } from "../../core/types/enums/StatusOfRequestEnum";
import { Wrapper } from "../../containers/wrapper";
import { Typography, Stack, CircularProgress } from "@mui/material";
import AlbumView from "../../components/simple/AlbumView";

const AlbumsPage = () => {
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
      {status === StatusOfRequestEnum.SUCCESS && (
        <Stack width={700} flexWrap="wrap" direction="row" gap="60px">
          {albums.map((item) => (
            <AlbumView
              key={item.id}
              photoUrl="https://via.placeholder.com/600/51aa97"
              title={item.title}
              id={item.id}
            ></AlbumView>
          ))}
        </Stack>
      )}

      {status === StatusOfRequestEnum.LOADING && <CircularProgress />}
      {status === StatusOfRequestEnum.ERROR && <p>{error}</p>}
    </Wrapper>
  );
};

export default AlbumsPage;
