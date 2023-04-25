import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import postsReducer from "./postsSlice";
import commentsReducer from "./commentsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
