import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "IdLogin",
  initialState: {
    idLogin: "",
  },

  reducers: {
    addId: (state, action) => {
      state.listProperties = action.payload;
    },
  },
});

export const { addId } = formSlice.actions;
export default formSlice.reducer;
