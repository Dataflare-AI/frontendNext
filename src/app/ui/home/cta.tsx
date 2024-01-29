import React from "react";
import Container from "./container";

const Cta = () => {
  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-black px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">
            Pronto para experimentar este produto?
          </h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            Cadastre-se agora ou faca login para que voce tenha acesso a todas
            as funcionalidades.
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <a
            href="/login"
            target="_blank"
            rel="noopener"
            className="hover:bg-black hover:border-white hover:text-white bg-white text-black border border-black transition-all rounded-md md:ml-5 text-center px-8 py-4 text-lg font-medium"
          >
            Entrar
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Cta;
