"use client";

import DataTable from "./components/DataTable";
import ImportExport from "./components/ImportExport";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h2 style={{ fontWeight: 600 }}>Dynamic Data Table Manager</h2>
      <ImportExport />
      <DataTable />
    </main>
  );
}
