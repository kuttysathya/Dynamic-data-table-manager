"use client";
import { useState } from "react";
import { Modal, Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  columns: string[];
  selectedColumns: string[];
  onSave: (cols: string[]) => void;
};

export default function ColumnModal({
  open,
  onClose,
  columns,
  selectedColumns,
  onSave,
}: Props) {
  const [tempCols, setTempCols] = useState(selectedColumns);
  const [newColumn, setNewColumn] = useState("");

  const toggleColumn = (col: string) => {
    setTempCols((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const addColumn = () => {
    if (!newColumn.trim()) return;
    onSave([...tempCols, newColumn.trim()]);
    setNewColumn("");
  };

  const handleSave = () => {
    onSave(tempCols);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, background: "white", width: 350, mx: "auto", mt: "15%", borderRadius: 2 }}>
        <h3 style={{ marginBottom: 10 }}>Manage Columns</h3>

        {columns.map((col) => (
          <FormControlLabel
            key={col}
            control={
              <Checkbox
                checked={tempCols.includes(col)}
                onChange={() => toggleColumn(col)}
              />
            }
            label={col}
          />
        ))}

        <div style={{ marginTop: 15 }}>
          <TextField
            size="small"
            label="Add new column"
            value={newColumn}
            onChange={(e) => setNewColumn(e.target.value)}
          />
          <Button variant="contained" onClick={addColumn} sx={{ ml: 1 }}>
            Add
          </Button>
        </div>

        <Button
          variant="contained"
          fullWidth
          color="success"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
}
