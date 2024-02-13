import React from "react";
import Navbar from "./ui/home/navbar";
import Hero from "./ui/home/hero";
import SectionTitle from "./ui/home/sectionTitle";
import Benefits from "./ui/home/benefits";
import Video from "./ui/home/video";
import Testimonials from "./ui/home/testimonials";
import Faq from "./ui/home/faq";
import Cta from "./ui/home/cta";
import Footer from "./ui/home/footer";
import PopupWidget from "./ui/home/popupWidget";
import { benefitTwo, benefitOne } from "./ui/home/data";

import "src/app/globals.css";

export default function Home() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <SectionTitle pretitle="Vantagens" title="Potencialize Seus Resultados!">
        Desbloqueie Insights Poderosos com Nossa Solução! Conecte-se ao futuro
        da análise de dados e impulsione seu produto com nossa plataforma.
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits data={benefitTwo} />
      <SectionTitle
        pretitle="Assista a um Vídeo"
        title="Descubra como a nossa solução pode atender às suas necessidades."
      >
        Explore as funcionalidades e benefícios do nosso produto em ação. Veja
        como nossa solução em análise de dados pode revolucionar sua compreensão
        e aproveitamento de informações assistindo ao vídeo abaixo!
      </SectionTitle>
      <Video />
      <SectionTitle
        pretitle="Avaliações"
        title="O que nossos usuários estão dizendo"
      >
        Avaliações são uma ótima maneira de aumentar a confiança e a
        conscientização do produto! Veja as avaliações de nossos usuários abaixo
      </SectionTitle>
      <Testimonials />
      <SectionTitle
        pretitle="Dúvidas Frequentes"
        title="Perguntas Comuns sobre Nossa Plataforma"
      >
        Aqui estão algumas perguntas frequentes que podem ajudar a esclarecer
        suas dúvidas. Se você tiver outras perguntas, entre em contato conosco
      </SectionTitle>
      <Faq />
      <Cta />
      <Footer />
      <PopupWidget />
    </div>
  );
}
