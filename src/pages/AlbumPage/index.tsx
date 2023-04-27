import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Wrapper } from "../../containers/wrapper";
import { useThunkDispatch } from "../../core/store/store";
import { fetchAlbumPhotos, fetchAlbumPhotosSelector } from "../../core/store/albumsSlice";
import { StatusOfRequestEnum } from "../../core/types/enums/StatusOfRequestEnum";
import { Typography, ImageList, ImageListItem, CircularProgress } from "@mui/material";

const AlbumPage = () => {
  const { albumId } = useParams();
  const dispatch = useThunkDispatch();
  const { data: photos, status, error } = useSelector(fetchAlbumPhotosSelector);

  useEffect(() => {
    if (albumId) {
      dispatch(fetchAlbumPhotos(albumId));
    }
  }, []);

  return (
    <Wrapper>
      <Typography variant="h4" color="text.primary">
        Album #{albumId}
      </Typography>
      {status === StatusOfRequestEnum.SUCCESS && (
        <ImageList sx={{ width: 700 }} cols={3} gap={2}>
          {photos.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.thumbnailUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {status === StatusOfRequestEnum.LOADING && <CircularProgress />}
      {status === StatusOfRequestEnum.ERROR && <p>{error}</p>}
    </Wrapper>
  );
};

export default AlbumPage;
