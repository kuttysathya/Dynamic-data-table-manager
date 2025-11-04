"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TextField } from "@mui/material";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

type TableRowType = {
  name: string;
  email: string;
  age: number;
  role: string;
  [key: string]: string | number;
};

export default function DataTable() {
  const { data } = useSelector((state: RootState) => state.table) as {
    data: TableRowType[];
  };

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  const filtered = data.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField];
    const valB = b[sortField];
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });


  return (
    <>
      <TextField
        label="Search..."
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                <strong>Name</strong> {sortField === "name" && (sortOrder === "asc" ? "▲" : "▼")}
              </TableCell>
              <TableCell onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                <strong>Email</strong> {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
              </TableCell>
              <TableCell onClick={() => handleSort("age")} style={{ cursor: "pointer" }}> {sortField === "age" && (sortOrder === "asc" ? "▲" : "▼")}
                <strong>Age</strong> {sortField === "age" && (sortOrder === "asc" ? "▲" : "▼")}
              </TableCell>
              <TableCell onClick={() => handleSort("role")} style={{ cursor: "pointer" }}> {sortField === "role" && (sortOrder === "asc" ? "▲" : "▼")}
                <strong>Role</strong> {sortField === "age" && (sortOrder === "asc" ? "▲" : "▼")}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
