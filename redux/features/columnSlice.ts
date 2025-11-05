import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColumnState {
  selected: string[];
}

const defaultCols = ["name", "email", "age", "role"];

const initialState: ColumnState = {
  selected:
    typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("columns") || JSON.stringify(defaultCols))
    : defaultCols
};

const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<string[]>) => {
      state.selected = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("columns", JSON.stringify(action.payload));
      }
    }
  },
});

export const { setColumns } = columnSlice.actions;
export default columnSlice.reducer;