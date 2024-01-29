import Image from "next/image";
import React from "react";
import Container from "./container";

import userOneImg from "public/user1.jpg";
import userTwoImg from "public/user2.jpg";
import userThreeImg from "public/user3.jpg";

interface AvaliacaoAvatarProps {
  image: string; // Corrected to use string
  name: string;
  title: string;
}

const Testimonials = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal text-gray-800 ">
              Realmente potencializou minha capacidade de análise de dados!
            </p>

            <AvaliacaoAvatar
              image={userOneImg.src}
              name="Sarah Steiner"
              title="Cientista de Dados na EmpresaX"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal text-gray-800 ">
              Simplesmente incrível! Essa ferramenta simplificou todo o processo
              de análise de dados.
            </p>

            <AvaliacaoAvatar
              image={userTwoImg.src}
              name="Marcos Conceição"
              title="Analista de Dados na EmpresaY"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal text-gray-800 ">
              A forma como apresentam os insights é simplesmente incrível. Não
              poderia pedir mais.
            </p>

            <AvaliacaoAvatar
              image={userThreeImg.src}
              name="Pedro Silveira"
              title="Co-fundador da EmpresaZ"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
function AvaliacaoAvatar(props: AvaliacaoAvatarProps) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image src={props.image} width="40" height="40" alt="Avatar" />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
      </div>
    </div>
  );
}

function Mark(props: { children: React.ReactNode }) {
  return (
    <>
      {" "}
      <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
        {props.children}
      </mark>{" "}
    </>
  );
}

export default Testimonials;
