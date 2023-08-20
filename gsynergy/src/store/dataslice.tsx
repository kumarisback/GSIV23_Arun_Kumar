import { createSlice } from "@reduxjs/toolkit";

export const dataslice = createSlice({
  name: "upcomingMovies", 
  initialState: {
    value: [], // Initialize with an empty array
  },
  reducers: {
    addMovie: (state, action: { payload: [] }) => {
      // Use the `action.payload` to add a movie to the array
      state.value.push(...action.payload);
    },
  },
});

export const { addMovie } = dataslice.actions; 

export default dataslice.reducer;
