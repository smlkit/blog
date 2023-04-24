import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import axios, { isAxiosError } from "axios";
import { StatusOfRequestEnum } from "../../types/enums/StatusOfRequestEnum";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?_limit=5";
const SINGLE_POST_URL = "https://jsonplaceholder.typicode.com/posts/";

interface PostsSlice {
  fetchPosts: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: PostsState[];
  };
  fetchSinglePost: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: PostsState | null;
  };
  fetchComments: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: CommentsState[];
  };
}

export interface PostsState {
  userId: number | null;
  id: number | null;
  title: string;
  body: string;
}

export interface CommentsState {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
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
  fetchComments: {
    status: StatusOfRequestEnum.IDLE,
    error: null,
    data: [],
  },
};

export const fetchPosts = createAsyncThunk<PostsState[], undefined, { rejectValue: string }>(
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

export const fetchSinglePost = createAsyncThunk<PostsState, number | string, { rejectValue: string }>(
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

export const fetchComments = createAsyncThunk<CommentsState[], number | string, { rejectValue: string }>(
  "posts/fetchComments",
  async (postID, { rejectWithValue }) => {
    try {
      const response = await axios.get(SINGLE_POST_URL + postID + `/comments`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("unknown error");
    }
  }
);

export const addNewPost = createAsyncThunk<PostsState, PostsState, { rejectValue: string }>(
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
      .addCase(fetchComments.pending, (state) => {
        state.fetchComments.status = StatusOfRequestEnum.LOADING;
        state.fetchComments.error = null;
        state.fetchComments.data = [];
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.fetchComments.status = StatusOfRequestEnum.SUCCESS;
        state.fetchComments.error = null;
        state.fetchComments.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.fetchComments.error = action.payload || "unknown error";
        state.fetchComments.status = StatusOfRequestEnum.ERROR;
        state.fetchComments.data = [];
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        console.log(action.payload);
        state.fetchPosts.data.push(action.payload);
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
export const fetchCommentsSelector = createSelector(selfSelector, (state) => state.fetchComments);

export default postsSlice.reducer;
