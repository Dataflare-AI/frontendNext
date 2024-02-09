"use client";

// Importações necessárias
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

import { DataTableDemo } from "@/app/ui/importFiles/table/table";

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

// Definição do componente
function ImportFiles() {
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
  const [fileName, setFileName] = useState<string | null>(null); // Novo estado para armazenar o nome do arquivo
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

  const CHUNK_SIZE = 1000; // Tamanho do bloco para processamento

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

          // Processamento do bloco
          console.log(`Processando linhas de ${start + 1} a ${end}`);
          // Aqui você pode realizar o processamento do bloco como desejar
          // Por exemplo, enviar o bloco para a OpenAI aqui
          // Ou realizar qualquer outra operação desejada
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

        // Agora você pode utilizar o tempo estimado para exibir uma barra de progresso ou outra indicação visual do progresso
        console.log(
          `Tempo estimado de processamento: ${estimatedTime} milissegundos`
        );

        // Garante que a barra de progresso atinge exatamente 100%
        setProgress(100);
      }
    } catch (error) {
      console.error("Erro durante o processamento do arquivo:", error);
    }
  };

  // Função para processar um bloco de dados
  const processarBloco = async (blockData: any[]) => {
    // Implemente o processamento do bloco conforme necessário
    // Por exemplo, você pode enviar esse bloco para a OpenAI aqui
    // Ou realizar qualquer outra operação desejada
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulação de processamento
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
          setFileName(selectedFile.name); // Atualiza o nome do arquivo quando um novo arquivo é carregado
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

  // Lógica para enviar mensagem para a OpenAI
  const sendMessageToOpenAI = async () => {
    try {
      console.log(`Mensagem enviada para a OpenAI: ${chatPrompt}`);
      // Lógica de envio para a OpenAI aqui
    } catch (error) {
      console.error("Erro durante o envio da mensagem:", error);
    }
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

  const removeColumn = (column: string) => {
    setSelectedColumns(selectedColumns.filter((col) => col !== column));
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

  // Renderização do componente
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

      <form className="form-group custom-form mb-3" onSubmit={handleFileSubmit}>
        <div className="flex flex-col md:flex-row items-stretch">
          <input
            type="file"
            className="form-control border rounded p-2 flex-grow mb-2 md:mb-0 md:mr-2"
            required
            onChange={handleFile}
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
              className="px-6 py-2 hover:bg-white hover:border-black hover:text-black hover:transition-colors bg-black text-white border border-transparent transition-border rounded-md md:w-40 md:flex-shrink-0 text-center"
              onClick={handleFileSubmit} // Alterado para chamar handleFileSubmit
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
      </form>

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
                {fileName && ( // Exibe o nome do arquivo
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

      {/* <DataTableDemo data={selectedSheetData || []} /> */}

      {selectedColumn && (
        <div className="mt-4">
          <label htmlFor="chatPrompt" className="text-lg mr-2">
            Prompt do Chat:
          </label>
          <textarea
            id="chatPrompt"
            placeholder={`Digite sua mensagem relacionada a ${selectedColumn}`}
            className="border rounded p-2 my-2 w-full"
            value={chatPrompt}
            onChange={(e) => setChatPrompt(e.target.value)}
            rows={6}
          />
          <button
            type="button"
            className="hover:bg-black hover:border-black hover:text-white bg-white text-black border border-black transition-all rounded-md text-center px-4 py-2"
            onClick={sendMessageToOpenAI}
          >
            Enviar Mensagem
          </button>
        </div>
      )}
    </div>
  );
}

export default ImportFiles;
