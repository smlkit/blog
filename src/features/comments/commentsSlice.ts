import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import axios, { isAxiosError } from "axios";
import { StatusOfRequestEnum } from "../../types/enums/StatusOfRequestEnum";

const SINGLE_POST_URL = "https://jsonplaceholder.typicode.com/posts/";

interface CommentsSlice {
  fetchComments: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: CommentsState[];
  };
}

export interface CommentsState {
  postId: number;
  id?: number;
  name?: string;
  email: string;
  body: string;
}

const initialState: CommentsSlice = {
  fetchComments: {
    status: StatusOfRequestEnum.IDLE,
    error: null,
    data: [],
  },
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(addNewComment.pending, (state) => {
        state.fetchComments.status = StatusOfRequestEnum.LOADING;
        state.fetchComments.error = null;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.fetchComments.status = StatusOfRequestEnum.SUCCESS;
        state.fetchComments.error = null;
        state.fetchComments.data.push(action.payload);
      })
      .addCase(addNewComment.rejected, (state, action) => {
        state.fetchComments.error = action.payload || "unknown error";
        state.fetchComments.status = StatusOfRequestEnum.ERROR;
      });
  },
});

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

export const addNewComment = createAsyncThunk<CommentsState, CommentsState, { rejectValue: string }>(
  "posts/addNewComment",
  async (comment, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${SINGLE_POST_URL}1/comments`, comment);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("unknown error");
    }
  }
);

const selfSelector = (state: RootState) => state.comments;

export const fetchCommentsSelector = createSelector(selfSelector, (state) => state.fetchComments);

export default commentsSlice.reducer;
