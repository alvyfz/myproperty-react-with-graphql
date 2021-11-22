import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    search: "",
  },

  reducers: {
    addSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { addSearch } = formSlice.actions;
export default formSlice.reducer;
