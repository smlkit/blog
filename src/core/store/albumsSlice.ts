import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios, { isAxiosError } from "axios";
import { StatusOfRequestEnum } from "../types/enums/StatusOfRequestEnum";
import { Album } from "../types/modules/Album";
import { Photo } from "../types/modules/Photo";

const ALBUMS_URL = "https://jsonplaceholder.typicode.com/albums?_limit=5";

interface AlbumsSlice {
  fetchAlbums: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: Album[];
  };
  fetchAlbumPhotos: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: Photo[];
  };
}

const initialState: AlbumsSlice = {
  fetchAlbums: {
    status: StatusOfRequestEnum.IDLE,
    error: null,
    data: [],
  },
  fetchAlbumPhotos: {
    status: StatusOfRequestEnum.IDLE,
    error: null,
    data: [],
  },
};

export const fetchAlbums = createAsyncThunk<Album[], undefined, { rejectValue: string }>(
  "posts/fetchAlbums",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ALBUMS_URL);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("unknown error");
    }
  }
);

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.fetchAlbums.status = StatusOfRequestEnum.LOADING;
        state.fetchAlbums.error = null;
        state.fetchAlbums.data = [];
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.fetchAlbums.status = StatusOfRequestEnum.SUCCESS;
        state.fetchAlbums.error = null;
        state.fetchAlbums.data = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.fetchAlbums.error = action.payload || "unknown error";
        state.fetchAlbums.status = StatusOfRequestEnum.ERROR;
        state.fetchAlbums.data = [];
      });
  },
});

const selfSelector = (state: RootState) => state.albums;

export const fetchAlbumsSelector = createSelector(selfSelector, (state) => state.fetchAlbums);

export default albumSlice.reducer;
