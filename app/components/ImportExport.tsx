"use client";
import { Button } from "@mui/material";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setData } from "../../redux/features/tableSlice";

export default function ImportExport() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.table.data);
  const selectedColumns = useSelector(
    (state: RootState) => state.columns.selected
  );

  const handleExport = () => {
    const filteredData = data.map((row: any) => {
      const obj: any = {};
      selectedColumns.forEach((col) => {
        obj[col] = row[col];
      });
      return obj;
    });

    const csv = Papa.unparse(filteredData);
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
        const rows = results.data;
        const requiredCols = ["name", "email", "age", "role"];
        const fileCols = Object.keys(rows[0] || {});

        const isValid = requiredCols.every((col) => fileCols.includes(col));
        if (!isValid) {
          alert("Invalid CSV format. Required columns missing!");
          return;
        }
        dispatch(setData(rows));
        alert("✅ CSV Imported Successfully");
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
