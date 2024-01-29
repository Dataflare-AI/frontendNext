import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "/public/benefit-one.png";
import benefitTwoImg from "/public/benefit-two.png";

const benefitOne = {
  title: "Análise Abrangente de Dados",
  desc: "Utilize análises avançadas para obter insights profundos em seus dados, descobrindo padrões e tendências valiosos.",
  image: benefitOneImg.src,
  imgPos: "left",
  bullets: [
    {
      title: "Compreensão do Cliente",
      desc: "Aprimore sua compreensão do comportamento e preferências do cliente, impulsionando tomadas de decisão informadas.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Tomada de Decisão Aprimorada",
      desc: "Tome decisões orientadas por dados com confiança, utilizando ferramentas analíticas poderosas para resultados aprimorados.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Engajamento Estratégico do Cliente",
      desc: "Elabore estratégias direcionadas para envolver os clientes de forma eficaz, fomentando relacionamentos de longo prazo e lealdade.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Aprimoramento de Insights",
  desc: "Eleve seus insights de dados a novos patamares, descobrindo oportunidades ocultas e otimizando seu processo de tomada de decisão.",
  image: benefitTwoImg.src,
  imgPos: "right",
  bullets: [
    {
      title: "Otimização Orientada por Dados",
      desc: "Otimize suas operações aproveitando insights detalhados, identificando áreas para aprimoramento e eficiência.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Análises Preditivas",
      desc: "Implemente análises preditivas para prever tendências futuras, possibilitando estratégias e planejamento proativos.",
      icon: <CursorArrowRaysIcon />,
    },
    {
      title: "Recomendações Acionáveis",
      desc: "Receba recomendações acionáveis baseadas em análises abrangentes de dados, impulsionando a melhoria contínua.",
      icon: <FaceSmileIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
