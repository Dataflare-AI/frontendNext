import React, { useState, useRef, FormEvent } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area"; // Importando ScrollArea
import * as XLSX from "xlsx";

export function DataTable() {
  const [excelData, setExcelData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
  const fileInputRef = useRef(null); // Referência para o input de arquivo
  const [isSheetLoading, setIsSheetLoading] = useState<boolean>(false);

  const LoadingModal: React.FC<{ visible: boolean }> = ({ visible }) => {
    if (!visible) {
      return null;
    }
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      console.error("Nenhum arquivo selecionado.");
      return;
    }

    const file = files[0];
    processExcelFile(file);
  };

  const handleFileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    fileInputRef.current?.click(); // Safely calling the click() method if fileInputRef.current is not null
  };

  const processExcelFile = (file) => {
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".xlsx") && !fileName.endsWith(".csv")) {
      console.error("Apenas arquivos .xlsx e .csv são permitidos.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt) => {
      if (evt.target) {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

        // Extrair os cabeçalhos das colunas
        const headers = data[0];

        // Convertendo os dados do Excel para o formato desejado
        const excelData = data.slice(1).map((row) => {
          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index];
          });
          return rowData;
        });

        setExcelData(excelData);
      } else {
        console.error("O evento não possui um alvo (target).");
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleColumnToggle = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleCellClick = (column) => {
    const columnData = excelData.map((row) => row[column]);
    setColumnData(columnData);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full">
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
      <div className=" flex-col md:flex-row items-stretch">
        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Clique para upload</span> ou arraste
                aqui
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                XSLX and CSV
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept=".xlsx,.csv"
              class="hidden"
            />
          </label>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleExcelUpload}
          style={{ display: "none" }} // Estilo para ocultar o input de arquivo
        />
        {isLoading ? (
          <button
            type="button"
            disabled
            className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-black-700 focus:text-black-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#000000"
              />
            </svg>
            IMPORTANDO...
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-2 hover:bg-white hover:border-black hover:text-black hover:transition-colors bg-black text-white border border-transparent transition-border rounded-md md:w-40 md:flex-shrink-0 text-center "
            onClick={handleFileSubmit}
            id="importButton"
          >
            IMPORTAR
          </button>
        )}
      </div>
      {typeError && (
        <div className="alert alert-danger mt-2" role="alert">
          {typeError}
        </div>
      )}
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
      <div className="rounded-md border">
        <Table>
          <TableBody>
            {/* Linhas da tabela (apenas uma célula por linha, representando a coluna) */}
            {excelData.length > 0 &&
              Object.keys(excelData[0]).map((header, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={header}
                        checked={selectedColumns.includes(header)}
                        onChange={() => handleColumnToggle(header)}
                      />
                      <Label htmlFor={header}>{header}</Label>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger onClick={() => handleCellClick(header)}>
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
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isModalOpen}>
        <DialogContent>
          {/* Usando o ScrollArea para adicionar scroll às linhas da coluna */}
          <ScrollArea className="h-60">
            {columnData.map((data, index) => (
              <p key={index}>{data}</p>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}