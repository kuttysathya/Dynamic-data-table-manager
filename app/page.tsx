"use client";

import DataTable from "./components/DataTable";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h2 style={{ fontWeight: 600 }}>Dynamic Data Table Manager</h2>
      <DataTable />
    </main>
  );
}
