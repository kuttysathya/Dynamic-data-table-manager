import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColumnState {
  all: string[];
  selected: string[];
}

const initialState: ColumnState = {
  all: ["name", "email", "age", "role"],
  selected: ["name", "email", "age", "role"],
};

const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<string[]>) => {
      state.selected = action.payload;
    },
    addNewColumn(state, action: PayloadAction<string>) {
      const newCol = action.payload;
      if (!state.all.includes(newCol)) {
        state.all.push(newCol);
      }
      if (!state.selected.includes(newCol)) {
        state.selected.push(newCol);
      }
    },
  },
});

export const { setColumns, addNewColumn } = columnSlice.actions;
export default columnSlice.reducer;
