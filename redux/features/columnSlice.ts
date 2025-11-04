import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColumnState {
  selected: string[];
}

const defaultCols = ["name", "email", "age", "role"];

const getInitialColumns = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("columns");
    return saved ? JSON.parse(saved) : defaultCols;
  }
  return defaultCols;
};

const initialState: ColumnState = {
  selected: getInitialColumns(),
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