import React from "react";

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = "Carregando..." }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f0f0", // Cor de fundo de sua escolha
        color: "#333", // Cor do texto de sua escolha
        fontSize: "1.5rem",
      }}
    >
      <div>
        <div
          style={{
            border: "4px solid #333", // Cor do círculo de carregamento
            borderTop: "4px solid transparent",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 0.8s linear infinite",
            marginRight: "10px",
          }}
        ></div>
        {text}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
