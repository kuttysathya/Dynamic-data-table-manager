"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import ColumnModal from "../components/ColumnModel";
import { setColumns, addNewColumn } from "../../redux/features/columnSlice";
import AddUserModal from "../components/AddUserModal";
import EditableCell from "../components/EditableCell";
import { updateRow, deleteRow } from "../../redux/features/tableSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";

export default function DataTable() {
  const data = useSelector((state: RootState) => state.table?.data || []);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const selectedColumns = useSelector(
    (state: RootState) => state.columns?.selected || []
  );

  const allColumns = Array.from(
    new Set(data.flatMap((obj) => Object.keys(obj)))
  );
  const [openAdd, setOpenAdd] = useState(false);

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

  const handleDelete = (rowIndex: number) => {
    if (confirm("Are you sure you want to delete this row?")) {
      dispatch(deleteRow(rowIndex));
    }
  };

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
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => setOpenAdd(true)}
        >
          + Add User
        </Button>

        <AddUserModal open={openAdd} onClose={() => setOpenAdd(false)} />

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
              .map((row, index) => {
                const actualIndex = index + page * rowsPerPage;

                return (
                  <TableRow key={actualIndex}>
                    {selectedColumns.map((col: string) => (
                      <EditableCell
                        key={col}
                        value={row[col]}
                        rowIndex={actualIndex}
                        columnKey={col}
                        onChange={(rowIdx, colKey, newVal) => {
                          dispatch(
                            updateRow({
                              rowIndex: rowIdx,
                              columnKey: colKey,
                              value: newVal,
                            })
                          );
                        }}
                      />
                    ))}

                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ mr: 1, mb: 1 }}
                        onClick={() =>
                          alert("Use inline editing by double-clicking cells")
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        sx={{ mr: 1, mb: 1 }}
                        onClick={() => handleDelete(actualIndex)} // use actualIndex here
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
          component="div"
          count={sortedData.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={() => {}}
        />

        <Button
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={() => setOpenModal(true)}
        >
          Manage Columns
        </Button>

        <ColumnModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          columns={allColumns}
          selectedColumns={selectedColumns}
          onSave={(cols) => dispatch(setColumns(cols))}
          onAddField={(field) => dispatch(addNewColumn(field))}
        />
      </TableContainer>
    </>
  );
}
