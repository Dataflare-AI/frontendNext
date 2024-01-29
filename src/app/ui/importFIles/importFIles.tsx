"use client";

// ImportFiles.tsx
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import * as XLSX from "xlsx";

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

// Defina o componente
function ImportFiles() {
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
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

  useEffect(() => {
    const fetchData = async () => {
      setIsSheetLoading(true); // Inicia o carregamento da folha de cálculo

      try {
        await processarArquivo();
      } finally {
        setIsSheetLoading(false); // Finaliza o carregamento da folha de cálculo
      }
    };

    if (selectedSheet !== null) {
      fetchData();
    }
  }, [selectedSheet]);

  const processarArquivo = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        try {
          if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: "buffer" });
            const sheetNames = workbook.SheetNames;
            setSheetsList(sheetNames);

            // Atualiza a folha (sheet) selecionada
            const selectedWorksheet =
              workbook.Sheets[selectedSheet || sheetNames[0]];
            const data = XLSX.utils.sheet_to_json(selectedWorksheet);

            setExcelData(data.slice(0, 10)); // Atualiza a visualização com os primeiros 10 itens
            setSelectedSheetData(data);
            setAreColumnsLoaded(false); // Reseta o estado quando a folha é trocada
            updateColumnsForSheet(selectedSheet);
          }
        } catch (error) {
          console.error("Erro durante o processamento do arquivo:", error);
        } finally {
          resolve();
        }
      }, 3000);
    });
  };

  // Lógica para manipular a seleção de arquivo
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

  const handleSheetSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSheetName = e.target.value;
    setSelectedSheet(selectedSheetName);
    setAreColumnsLoaded(false); // Reseta o estado quando a folha é trocada
    updateColumnsForSheet(selectedSheetName);
  };

  const updateColumnsForSheet = async (sheetName: string | null) => {
    if (excelFile !== null && sheetName !== null) {
      setIsSheetLoading(true); // Inicia o carregamento das colunas da nova folha

      try {
        const workbook = XLSX.read(excelFile, { type: "buffer" });
        const selectedWorksheet = workbook.Sheets[sheetName];
        const data: ExcelDataItem[] =
          XLSX.utils.sheet_to_json(selectedWorksheet);
        const columns = Object.keys(data[0]);

        setSelectedColumn(columns[0]);
        setSelectedSheetData(data);
        setAreColumnsLoaded(true);
      } catch (error) {
        console.error("Erro durante o processamento das colunas:", error);
      } finally {
        setIsSheetLoading(false); // Finaliza o carregamento das colunas
      }
    }
  };

  const handleFileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await processarArquivo();
    } finally {
      setIsLoading(false);
    }
  };

  // Lógica para enviar mensagem para a OpenAI
  const sendMessageToOpenAI = async () => {
    try {
      // Implemente a lógica para enviar a mensagem para a API da OpenAI
      // e receber a resposta do ChatGPT aqui

      console.log(`Mensagem enviada para a OpenAI: ${chatPrompt}`);

      // A resposta do ChatGPT será tratada aqui
      // (quando a integração com a API da OpenAI estiver pronta)
    } catch (error) {
      console.error("Erro durante o envio da mensagem:", error);
    }
  };

  // Lógica para manipular a seleção de coluna
  const handleColumnSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn(e.target.value);

    // Adicione a lógica para rolar até o final da página apenas em telas maiores que 768 pixels
    if (window.innerWidth > 768) {
      const dropdownScrollOptions = {
        top: document.getElementById("columnDropdown")?.offsetTop || 0,
        behavior: "smooth" as ScrollBehavior,
      };
      window.scrollTo(dropdownScrollOptions);
    }
  };

  // Lógica para animar o botão de importação
  const animateButton = async () => {
    setIsLoading(true);

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

      try {
        await processarArquivo();
      } catch (error) {
        console.error("Erro durante o processamento do arquivo:", error);
      } finally {
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
    }
  };

  return (
    <div className="wrapper p-8 bg-white">
      <h3 className="text-3xl font-bold mb-6">
        Importar & Visualizar Arquivos
      </h3>

      <form className="form-group custom-form" onSubmit={handleFileSubmit}>
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
              onClick={animateButton}
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

      <LoadingModal
        visible={(isLoading || isSheetLoading) && selectedSheet !== null}
      />

      {excelData && (
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

          {/* Dropdown de Seleção de Coluna */}
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
                  {excelData.map((individualExcelData, index) => (
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
