import { configureStore } from "@reduxjs/toolkit";
import dataslice from "./dataslice";

export const store = configureStore({
  reducer: {
    upcomingMovies: dataslice,
  },
});
