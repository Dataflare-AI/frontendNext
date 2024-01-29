"use client";

import React, { useState } from "react";
import Container from "./container";
// import { ChevronUpIcon } from "@heroicons/react/24/solid";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Specify the type

  const handleToggle = (index: number) => {
    // Explicitly specify the type
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <button
              onClick={() => handleToggle(index)}
              className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200"
            >
              <span>{item.question}</span>
              {/* Use seu ícone desejado aqui, substituindo ChevronUpIcon */}
              <span className="w-5 h-5 text-gray-500">
                {openIndex === index ? "▼" : "▶"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqdata = [
  {
    question: "O serviço é gratuito?",
    answer:
      "Não, nossa plataforma é paga e oferece planos ajustados às necessidades das empresas que desejam melhorar seu desempenho na área de análise de dados.",
  },
  {
    question: "Como posso usar a plataforma em um projeto comercial?",
    answer:
      "Você pode utilizar nossa plataforma em projetos comerciais adquirindo um de nossos planos pagos. Entre em contato conosco para discutir as opções disponíveis.",
  },
  {
    question: "Qual é a política de reembolso?",
    answer:
      "Se você não estiver satisfeito com nossa plataforma, entre em contato conosco dentro de 30 dias após a compra, e teremos o prazer de discutir opções de reembolso ou ajustes de plano.",
  },
  {
    question: "Vocês oferecem suporte técnico?",
    answer:
      "Sim, oferecemos suporte técnico para clientes que adquirem nossos planos premium. Nossa equipe está pronta para ajudar a garantir que você obtenha o máximo de benefícios de nossa plataforma.",
  },
];

export default Faq;
