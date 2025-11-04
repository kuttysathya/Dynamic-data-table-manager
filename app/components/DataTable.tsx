"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { TextField } from "@mui/material";
import { useState } from "react";
import { TablePagination } from "@mui/material";
import ColumnModal from "../components/ColumnModel";
import { setColumns } from "../../redux/features/columnSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
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
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const selectedColumns = useSelector((state: RootState) => state.columns.selected);

  const allColumns = ["name", "email", "age", "role"];


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
              {selectedColumns.map((col: string) => (
                <TableCell
                  key={col}
                  onClick={() => handleSort(col)}
                  style={{ cursor: "pointer" }}
                >
                  <strong>{col.toUpperCase()}</strong>
                  {sortField === col && (sortOrder === "asc" ? " ▲" : " ▼")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  {selectedColumns.map((col: string) => (
                    <TableCell key={col}>{row[col]}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
            component="div"
            count={sortedData.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5]}
            onRowsPerPageChange={() => {}}
        />

        <Button variant="outlined" sx={{ mb: 2 }} onClick={() => setOpenModal(true)}>
            Manage Columns
        </Button>

        <ColumnModal
           open={openModal}
           onClose={() => setOpenModal(false)}
           columns={allColumns}
           selectedColumns={selectedColumns}
           onSave={(cols) => dispatch(setColumns(cols))}
        />
      </TableContainer>
    </>
  );
}
