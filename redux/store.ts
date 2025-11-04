import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./features/tableSlice";
import columnsReducer from "./features/columnSlice";

export const store = configureStore({
  reducer: {
    table: tableReducer,
    columns: columnsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
