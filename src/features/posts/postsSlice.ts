import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import type { RootState } from '../../app/store';
import axios, { isAxiosError } from "axios";
import { StatusOfRequestEnum } from "../../types/enums/StatusOfRequestEnum";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

interface PostsSlice {
    fetchPosts: {
        status: StatusOfRequestEnum,
        error: string | null,
        data: PostsState[],
    }
};

export interface PostsState {
    userId: number,
    id: number,
    title: string,
    body: string,
};

const initialState: PostsSlice = {
    fetchPosts: {
        status: StatusOfRequestEnum.IDLE,
        error: null,
        data: [],
    }
};

export const fetchPosts = createAsyncThunk<PostsState[], undefined, { rejectValue: string }>('posts/fetchPosts', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(POSTS_URL);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) return rejectWithValue(error.message);
        return rejectWithValue('unknown error');
    }
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.fetchPosts.status = StatusOfRequestEnum.LOADING;
            state.fetchPosts.error = null;
            state.fetchPosts.data = [];
        }).addCase(fetchPosts.fulfilled, (state, action) => {
            state.fetchPosts.status = StatusOfRequestEnum.SUCCESS;
            state.fetchPosts.error = null;
            state.fetchPosts.data = action.payload;
        }).addCase(fetchPosts.rejected, (state, action) => {
            state.fetchPosts.error = action.payload || 'unknown error';
            state.fetchPosts.status = StatusOfRequestEnum.ERROR;
            state.fetchPosts.data = [];
        })
    }
});

const selfSelector = (state: RootState) => state.posts;
export const fetchPostsSelector = createSelector(selfSelector, (state) => state.fetchPosts);

// export const selectAllPosts = (state: RootState) => state.posts.fetchPosts.data;

export default postsSlice.reducer;