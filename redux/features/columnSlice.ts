import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColumnState {
  selected: string[];
}

const initialState: ColumnState = {
  selected: JSON.parse(localStorage.getItem("columns") || 
    `["name","email","age","role"]`)
};

const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<string[]>) => {
      state.selected = action.payload;
      localStorage.setItem("columns", JSON.stringify(action.payload));
    }
  },
});

export const { setColumns } = columnSlice.actions;
export default columnSlice.reducer;