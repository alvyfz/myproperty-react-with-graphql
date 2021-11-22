import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "listProperty",
  initialState: {
    listProperties: "",
  },

  reducers: {
    addList: (state, action) => {
      state.listProperties = action.payload;
    },
  },
});

export const { addList } = formSlice.actions;
export default formSlice.reducer;
