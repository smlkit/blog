import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import postsReducer from "./postsSlice";
import commentsReducer from "./commentsSlice";
import albumsReducer from "./albumsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    albums: albumsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
