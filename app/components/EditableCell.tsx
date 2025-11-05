"use client";

import { useState } from "react";
import { TableCell, TextField } from "@mui/material";

type EditableCellProps = {
  value: string | number;
  rowIndex: number;
  columnKey: string;
  onChange: (rowIndex: number, columnKey: string, newValue: string | number) => void;
};

export default function EditableCell({ value, rowIndex, columnKey, onChange }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleDoubleClick = () => setIsEditing(true);

  const saveEdit = () => {
    if (columnKey === "age" && isNaN(Number(tempValue))) {
      alert("Age must be a number");
      return;
    }
    onChange(rowIndex, columnKey, tempValue);
    setIsEditing(false);
  };

  return (
    <TableCell 
      onDoubleClick={handleDoubleClick}
      sx={{
        cursor: "pointer",
        minWidth: 100,
        height: 40,
        padding: "6px 12px",
        userSelect: isEditing ? "text" : "none",
        position: "relative",
        "&:hover": { backgroundColor: "#f5f5f5" }, // subtle hover effect
      }}>
      {isEditing ? (
        <TextField
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") setIsEditing(false);
          }}
          size="small"
          autoFocus
          sx={{
            height: 30,
            "& .MuiInputBase-input": { padding: "4px 8px" },
          }}
        />
      ) : (
        value
      )}
    </TableCell>
  );
}
