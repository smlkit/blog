import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import postsReducer from "../features/posts/postsSlice";
import commentsReducer from "../features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
