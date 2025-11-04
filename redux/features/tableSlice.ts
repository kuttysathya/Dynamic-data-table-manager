import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    { name: "Sandya", email: "sandya@example.com", age: 23, role: "Developer" },
    { name: "Ankit", email: "ankit@example.com", age: 25, role: "Designer" },
    { name: "Riya", email: "riya@example.com", age: 22, role: "Intern" },
  ],
  visibleColumns: ["name", "email", "age", "role"],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setVisibleColumns: (state, action) => {
      state.visibleColumns = action.payload;
    },
  },
});

export const { setVisibleColumns } = tableSlice.actions;
export default tableSlice.reducer;
