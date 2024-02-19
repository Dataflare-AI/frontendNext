import React, {
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
  useEffect,
} from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as XLSX from "xlsx";

export function DataTable() {
  const [excelData, setExcelData] = useState<any[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [columnData, setColumnData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSheetLoading, setIsSheetLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const totalRows = excelData.length;
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>("");
  const [wb, setWb] = useState<any>(null);

  const handleExcelUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      console.error("Nenhum arquivo selecionado.");
      return;
    }

    const file = files[0];
    setExcelFile(file); // Definindo o arquivo selecionado no estado excelFile
    processExcelFile(file);
    setIsSheetLoading(true); // Ativa o diálogo de seleção de planilha assim que o arquivo é carregado
  };
  const processExcelFile = (file: File) => {
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".xlsx") && !fileName.endsWith(".csv")) {
      console.error("Apenas arquivos .xlsx e .csv são permitidos.");
      return;
    }

    setIsLoading(true); // Ativa o indicador de carregamento
    const reader = new FileReader();

    reader.onload = (evt) => {
      if (evt.target) {
        const bstr = evt.target.result as string;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as string[][];

        setSheetNames(wb.SheetNames); // Set sheet names first
        setWb(wb);

        const headers = data[0] as string[];

        const excelData = data.slice(1).map((row: string[]) => {
          const rowData: { [key: string]: any } = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index];
          });
          return rowData;
        });

        setExcelData(excelData);
        setFileName(file.name);
        setFileSize(file.size);
      } else {
        console.error("O evento não possui um alvo (target).");
      }
    };

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 10;
        setProgress(progress);
      }
    };

    reader.onloadend = () => {
      setIsLoading(false); // Desativa o indicador de carregamento quando o arquivo é totalmente carregado
    };

    reader.readAsBinaryString(file);
  };

  const handleSheetSelection = (sheetName: string) => {
    setSelectedSheet(sheetName);
    setIsSheetLoading(true);
    const ws = wb.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as string[][];
    // Process the data of the selected sheet
    // Update the excelData state with the data of the selected sheet
    setExcelData(data); // Update excelData with the data of the selected sheet
    setIsSheetLoading(false); // Set isSheetLoading to false after data processing
  };

  const handleColumnToggle = (column: string) => {
    console.log(column);
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleCellClick = (column: string) => {
    const columnData = excelData.map((row) => row[column]);
    setColumnData(columnData);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full relative">
      {isLoading && (
        <div className="loading h-2 w-[100%] bg-green-700 transition-all duration-200 absolute z-40 top-0 "></div>
      )}

      <div className="flex-col md:flex-row items-stretch">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Clique para upload</span> ou
                arraste aqui
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                XSLX and CSV
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept=".xlsx,.csv"
              className="hidden"
              onChange={handleExcelUpload}
            />
          </label>
        </div>
      </div>
      <Dialog open={isSheetLoading}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecione uma Página</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-60">
            {sheetNames.map((sheetName) => (
              <p
                key={sheetName}
                onClick={() => handleSheetSelection(sheetName)}
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-md"
              >
                {sheetName}
              </p>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {excelFile && (
        <Dialog>
          <DialogTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="my-4 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
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
                    <p className="">
                      Tamanho:{" "}
                      {parseFloat(
                        (fileSize / 1024).toFixed(2)
                      ).toLocaleString()}{" "}
                      KB
                    </p>
                  </div>
                )}
                {totalRows && (
                  <div className="mt-2">
                    <p className="">Linhas: {totalRows.toLocaleString()}</p>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      <div className="rounded-md border">
        <Table>
          <TableBody>
            {excelData.length > 0 && (
              <>
                {Object.keys(excelData[0]).map((columnName, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={columnName}
                          checked={selectedColumns.includes(columnName)}
                          onClick={() => handleColumnToggle(columnName)}
                        />
                        <label
                          htmlFor={columnName}
                          className="text-sm font-medium leading-none"
                        >
                          {columnName}
                        </label>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger
                          onClick={() => handleCellClick(columnName)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                            />
                          </svg>
                        </DialogTrigger>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-1 flex-1 text-sm text-muted-foreground">
        {excelData.length > 0 && (
          <>
            {selectedColumns.length} de {Object.keys(excelData[0]).length}{" "}
            coluna(s) selecionada(s).
          </>
        )}
      </div>
      <Dialog open={isModalOpen}>
        <DialogContent>
          <ScrollArea className="h-60">
            {columnData.map((data, index) => (
              <p key={index}>{data}</p>
            ))}
          </ScrollArea>
          <DialogTrigger onClick={() => setIsModalOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="absolute top-4 right-4 w-6 h-6 m-0 cursor-pointer text-gray-500 hover:text-gray-700 opacity-70 rounded-sm ring-offset-white transition-opacity focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </div>
  );
}
