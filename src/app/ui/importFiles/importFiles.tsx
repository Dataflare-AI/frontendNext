"use client";

import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DataTable } from "@/app/ui/importFiles/table/table";

type ExcelDataItem = Record<string, any>; // Ajuste o tipo conforme necessário

const LoadingModal: React.FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-200"></div>
    </div>
  );
};

function ImportFiles() {
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<any[] | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [chatPrompt, setChatPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [sheetsList, setSheetsList] = useState<string[]>([]);
  const [selectedSheetData, setSelectedSheetData] = useState<any[] | null>(
    null
  );
  const [isSheetLoading, setIsSheetLoading] = useState<boolean>(false);
  const [areColumnsLoaded, setAreColumnsLoaded] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [totalRows, setTotalRows] = useState<number | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  // Efeito para carregar os dados da folha quando a folha é selecionada
  useEffect(() => {
    const fetchData = async () => {
      setIsSheetLoading(true);

      try {
        await processarArquivo();
      } finally {
        setIsSheetLoading(false);
      }
    };

    if (selectedSheet !== null) {
      fetchData();
    }
  }, [selectedSheet]);

  const CHUNK_SIZE = 1000;

  const processarArquivo = async () => {
    try {
      if (excelFile !== null) {
        const fileSizeInKB = (excelFile.byteLength / 1024).toFixed(2);
        const fileSizeAsNumber = parseFloat(fileSizeInKB);
        setFileSize(fileSizeAsNumber);

        const workbook = XLSX.read(excelFile, { type: "buffer" });
        const sheetNames = workbook.SheetNames;
        setSheetsList(sheetNames);

        const selectedWorksheet =
          workbook.Sheets[selectedSheet || sheetNames[0]];
        const data = XLSX.utils.sheet_to_json(selectedWorksheet);

        setExcelData(data.slice(0, 10));
        setSelectedSheetData(data);
        setAreColumnsLoaded(false);

        if (
          data.length > 0 &&
          typeof data[0] === "object" &&
          data[0] !== null
        ) {
          setSelectedColumn(Object.keys(data[0] as Record<string, any>)[0]);
          setSelectedSheetData(data);
          setAreColumnsLoaded(true);
        } else {
          console.error("Os dados da folha não são do tipo esperado.");
        }

        const totalRows = data.length;
        setTotalRows(totalRows);

        const startTime = performance.now(); // Tempo de início do processamento
        const CHUNK_SIZE = Math.ceil(totalRows / 10); // Tamanho do bloco ajustado dinamicamente

        // Processa as linhas em blocos
        let processedRows = 0;
        for (let start = 0; start < totalRows; start += CHUNK_SIZE) {
          const end = Math.min(start + CHUNK_SIZE, totalRows);
          const chunk = data.slice(start, end);

          console.log(`Processando linhas de ${start + 1} a ${end}`);
          await processarBloco(chunk);

          processedRows += chunk.length;
          const percentage = (processedRows / totalRows) * 100;
          setProgress(percentage);
        }

        const endTime = performance.now(); // Tempo de término do processamento
        const processingTime = endTime - startTime; // Tempo total de processamento

        // Calcula o tempo necessário para processar 100 KB do arquivo
        const timePer100KB = (processingTime / fileSizeAsNumber) * 100;
        const estimatedTime = timePer100KB * 100; // Tempo estimado para processar o arquivo inteiro

        console.log(
          `Tempo estimado de processamento: ${estimatedTime} milissegundos`
        );

        setProgress(100);
      }
    } catch (error) {
      console.error("Erro durante o processamento do arquivo:", error);
    }
  };

  const processarBloco = async (blockData: any[]) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      let fileTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
      let selectedFile = e.target.files?.[0];

      if (selectedFile) {
        if (selectedFile && fileTypes.includes(selectedFile.type)) {
          setTypeError(null);
          setFileName(selectedFile.name);
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);

          reader.onload = (e) => {
            setExcelFile(e?.target?.result as ArrayBuffer);
          };
        } else {
          setTypeError("Por favor, selecione apenas arquivos do tipo Excel");
          setExcelFile(null);
        }
      } else {
        console.log("Por favor, selecione seu arquivo");
      }
    } catch (error) {
      console.error("Erro durante o processamento do arquivo:", error);
      setTypeError("Erro durante o processamento do arquivo");
      setExcelFile(null);
    }
  };

  // Lógica para selecionar a folha
  const handleSheetSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSheetName = e.target.value;
    setSelectedSheet(selectedSheetName);
    setAreColumnsLoaded(false);
    updateColumnsForSheet(selectedSheetName);
  };

  // Lógica para manipular a seleção de coluna
  const handleColumnSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedColumn = e.target.value;
    if (!selectedColumns.includes(selectedColumn)) {
      setSelectedColumns([...selectedColumns, selectedColumn]);
    }

    // Lógica para rolar até o final da página apenas em telas maiores que 768 pixels
    if (window.innerWidth > 768) {
      const dropdownScrollOptions = {
        top: document.getElementById("columnDropdown")?.offsetTop || 0,
        behavior: "smooth" as ScrollBehavior,
      };
      window.scrollTo(dropdownScrollOptions);
    }
  };

  // Lógica para atualizar as colunas da folha
  const updateColumnsForSheet = async (sheetName: string | null) => {
    if (excelFile !== null && sheetName !== null) {
      setIsSheetLoading(true);

      try {
        const workbook = XLSX.read(excelFile, { type: "buffer" });
        const selectedWorksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(selectedWorksheet);
        const columns = Object.keys(data[0] as ExcelDataItem);
        setSelectedColumn(columns[0]);
        setSelectedSheetData(data);
        setAreColumnsLoaded(true);
      } catch (error) {
        console.error("Erro durante o processamento das colunas:", error);
      } finally {
        setIsSheetLoading(false);
      }
    }
  };

  const handleFileSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Adiciona a classe de animação diretamente
    const button = document.getElementById("importButton");
    if (button) {
      button.classList.add(
        "h-12",
        "w-12",
        "border-l-gray-200",
        "border-r-gray-200",
        "border-b-gray-200",
        "border-t-black-500",
        "animate-spin",
        "ease-linear",
        "rounded-full"
      );
    }

    setIsLoading(true);

    try {
      // Reinicia a barra de progresso antes do processamento
      setProgress(0);
      await processarArquivo();
    } catch (error) {
      console.error("Erro durante o processamento do arquivo:", error);
    } finally {
      // Remove a classe de animação após o término do processamento
      if (button) {
        button.classList.remove(
          "h-12",
          "w-12",
          "border-l-gray-200",
          "border-r-gray-200",
          "border-b-gray-200",
          "border-t-black-500",
          "animate-spin",
          "ease-linear",
          "rounded-full"
        );
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper p-8 bg-white">
      {isLoading && (
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div></div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blueGray-600">
                {`${Math.round(progress)}%`}
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blueGray-200">
            <div
              style={{ width: `${Math.round(progress)}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black"
            ></div>
          </div>
        </div>
      )}
      <h3 className="text-3xl font-bold mb-6">
        Importar & Visualizar Arquivos
      </h3>

      {excelFile && (
        <Dialog>
          <DialogTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Informações do Arquivo</DialogTitle>
              <DialogDescription>
                {fileName && (
                  <div className="mt-2">
                    <p className="">Documento: {fileName}</p>
                  </div>
                )}
                {fileSize && (
                  <div className="mt-2">
                    <p className="">Tamanho: {fileSize}KB</p>
                  </div>
                )}
                {totalRows && (
                  <div className="mt-2">
                    <p className="">Linhas: {totalRows}</p>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      <LoadingModal
        visible={(isLoading || isSheetLoading) && selectedSheet !== null}
      />

      {progress === 100 && totalRows && (
        <div className="mt-4">
          <label htmlFor="sheetDropdown" className="text-lg">
            Selecione uma página:
          </label>
          <select
            id="sheetDropdown"
            name="sheet"
            onChange={handleSheetSelect}
            value={selectedSheet || ""}
            className="border rounded p-2 max-w-full"
          >
            {sheetsList.map((sheet) => (
              <option key={sheet} value={sheet}>
                {sheet}
              </option>
            ))}
          </select>

          {selectedSheetData && (
            <div className="mt-4">
              <label htmlFor="columnDropdown" className="text-lg">
                Selecione uma coluna:
              </label>
              <select
                id="columnDropdown"
                name="column"
                onChange={(e) => setSelectedColumn(e.target.value)}
                value={selectedColumn || ""}
                className="border rounded p-2 max-w-full"
              >
                {Object.keys(selectedSheetData[0]).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="viewer mt-4 overflow-x-auto">
            <div className="table-responsive">
              <table className="table border-collapse border w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border p-2">{selectedColumn}</th>
                  </tr>
                </thead>
                <tbody>
                  {excelData &&
                    excelData.map((individualExcelData, index) => (
                      <tr key={index}>
                        <td className="border p-2">
                          {selectedColumn !== null
                            ? individualExcelData[selectedColumn]
                            : ""}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <DataTable />
    </div>
  );
}

export default ImportFiles;
