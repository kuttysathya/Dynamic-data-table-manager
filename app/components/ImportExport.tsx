"use client";
import { Button } from "@mui/material";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setData } from "../../redux/features/tableSlice";

export default function ImportExport() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.table.data);

  const handleExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "table_data.csv";
    link.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        dispatch(setData(results.data));
      },
      error: () => alert("Invalid CSV format"),
    });
  };

  return (
    <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
      <Button variant="contained" onClick={handleExport}>
        Export CSV
      </Button>

      <Button variant="contained" component="label">
        Import CSV
        <input type="file" accept=".csv" hidden onChange={handleImport} />
      </Button>
    </div>
  );
}
