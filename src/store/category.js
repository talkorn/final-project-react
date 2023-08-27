import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theCategory: "necklaces",
};
const categorySlice = createSlice({
  name: "categoryMode",
  initialState,
  reducers: {
    changeMode(state, action) {
      state.theCategory = action.payload.theCategory; // Use action.payload.category
    },
  },
});
export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
