import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableRow {
  [key: string]: string | number;
  name: string;
  email: string;
  age: number;
  role: string;
}

const initialState = {
  data: [
    { name: "Sandya", email: "sandya@example.com", age: 23, role: "Developer" },
    { name: "Ankit", email: "ankit@example.com", age: 25, role: "Designer" },
    { name: "Riya", email: "riya@example.com", age: 22, role: "Intern" },
  ] as TableRow[],
  visibleColumns: ["name", "email", "age", "role"] as string[],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setVisibleColumns: (state, action) => {
      state.visibleColumns = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    addRow: (state, action) => {
      state.data.push(action.payload);
    },
    addColumnToData: (state, action: PayloadAction<string>) => {
      const newCol = action.payload;
      state.data = state.data.map((row) => {
        if (row[newCol] !== undefined) return row;
        return { ...row, [newCol]: "" };
      });
      if (!state.visibleColumns.includes(newCol)) {
        state.visibleColumns.push(newCol);
      }
    },
    updateRow: (
      state,
      action: PayloadAction<{
        rowIndex: number;
        columnKey: string;
        value: string | number;
      }>
    ) => {
      const { rowIndex, columnKey, value } = action.payload;
      if (state.data[rowIndex]) {
        state.data[rowIndex][columnKey] = value;
      }
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
   },
  },
});

export const { setVisibleColumns, setData, addRow, addColumnToData, updateRow, deleteRow } =
  tableSlice.actions;
export default tableSlice.reducer;
