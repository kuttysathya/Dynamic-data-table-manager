"use client";
import { Modal, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRow } from "../../redux/features/tableSlice";

export default function AddUserModal({ open, onClose }: any) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", email: "", age: "", role: "" });

  const handleSubmit = () => {
    dispatch(addRow({ ...form, age: Number(form.age) }));
    onClose();
    setForm({ name: "", email: "", age: "", role: "" });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, bgcolor: "white", width: 300, mx: "auto", mt: 10 }}>
        <TextField fullWidth label="Name" sx={{ mb: 2 }}
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <TextField fullWidth label="Email" sx={{ mb: 2 }}
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <TextField fullWidth label="Age" sx={{ mb: 2 }} type="number"
          value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />

        <TextField fullWidth label="Role" sx={{ mb: 2 }}
          value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />

        <Button variant="contained" fullWidth onClick={handleSubmit}>Add User</Button>
      </Box>
    </Modal>
  );
}
