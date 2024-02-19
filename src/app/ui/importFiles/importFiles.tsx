"use client";

import React from "react";
import { DataTable } from "@/app/ui/importFiles/table/table";

function ImportFiles() {
  return (
    <div className="wrapper p-8">
      <h3 className="text-3xl font-bold mb-6">
        Importar & Visualizar Arquivos
      </h3>
      <DataTable />
    </div>
  );
}

export default ImportFiles;
