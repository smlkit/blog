import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios, { isAxiosError } from "axios";
import { StatusOfRequestEnum } from "../types/enums/StatusOfRequestEnum";
import { Post } from "../types/modules/Post";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?_limit=5";
const SINGLE_POST_URL = "https://jsonplaceholder.typicode.com/posts/";

interface PostsSlice {
  fetchPosts: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: Post[];
  };
  fetchSinglePost: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: Post | null;
  };
}

const initialState: PostsSlice = {
  fetchPosts: {
    status: StatusOfRequestEnum.IDLE,
    error: null,
    data: [],
  },
  fetchSinglePost: {
    status: StatusOfRequestEnum.IDLE,
    error: null,
    data: null,
  },
};

export const fetchPosts = createAsyncThunk<Post[], undefined, { rejectValue: string }>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(POSTS_URL);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("unknown error");
    }
  }
);

export const fetchSinglePost = createAsyncThunk<Post, number | string, { rejectValue: string }>(
  "posts/fetchSinglePost",
  async (postID, { rejectWithValue }) => {
    try {
      const response = await axios.get(SINGLE_POST_URL + postID);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("unknown error");
    }
  }
);

export const addNewPost = createAsyncThunk<Post, Post, { rejectValue: string }>(
  "posts/addNewPost",
  async (post, { rejectWithValue }) => {
    try {
      const response = await axios.post(POSTS_URL, post);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("unknown error");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetchPosts.status = StatusOfRequestEnum.LOADING;
        state.fetchPosts.error = null;
        state.fetchPosts.data = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.fetchPosts.status = StatusOfRequestEnum.SUCCESS;
        state.fetchPosts.error = null;
        state.fetchPosts.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetchPosts.error = action.payload || "unknown error";
        state.fetchPosts.status = StatusOfRequestEnum.ERROR;
        state.fetchPosts.data = [];
      })
      .addCase(fetchSinglePost.pending, (state) => {
        state.fetchSinglePost.status = StatusOfRequestEnum.LOADING;
        state.fetchSinglePost.error = null;
        state.fetchSinglePost.data = null;
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.fetchSinglePost.status = StatusOfRequestEnum.SUCCESS;
        state.fetchSinglePost.error = null;
        state.fetchSinglePost.data = action.payload;
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.fetchSinglePost.error = action.payload || "unknown error";
        state.fetchSinglePost.status = StatusOfRequestEnum.ERROR;
        state.fetchSinglePost.data = null;
      })
      .addCase(addNewPost.pending, (state) => {
        state.fetchPosts.status = StatusOfRequestEnum.LOADING;
        state.fetchPosts.error = null;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.fetchPosts.status = StatusOfRequestEnum.SUCCESS;
        state.fetchPosts.error = null;
        state.fetchPosts.data.push(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.fetchPosts.error = action.payload || "unknown error";
        state.fetchPosts.status = StatusOfRequestEnum.ERROR;
      });
  },
});

const selfSelector = (state: RootState) => state.posts;

export const fetchPostsSelector = createSelector(selfSelector, (state) => state.fetchPosts);
export const fetchSinglePostSelector = createSelector(selfSelector, (state) => state.fetchSinglePost);
export const filteredPostsSelector = (value: string) =>
  createSelector(fetchPostsSelector, ({ data, ...other }) => ({
    ...other,
    data: data.filter((item) => item.title.includes(value)),
  }));

export default postsSlice.reducer;
