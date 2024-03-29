import React from "react";
import Image from "next/image";
import Container from "./container";

interface BenefitProps {
  title: string;
  icon: React.ReactElement;
  desc: string;
}

interface BenefitsProps {
  data: {
    image: string | { src: string; alt: string };
    imgPos: string;
    title: string;
    desc: string;
    bullets: BenefitProps[];
  };
}

const Benefits: React.FC<BenefitsProps> = ({ data }) => {
  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap mx-auto">
      <div
        className={`flex items-center justify-center w-full lg:w-1/2 ${
          data.imgPos === "right" ? "lg:order-1" : ""
        }`}
      >
        <div>
          <Image
            src={typeof data.image === "string" ? data.image : data.image.src}
            width="521"
            height={10}
            alt="Benefits"
            className={"object-cover"}
            placeholder="blur"
            blurDataURL={
              typeof data.image === "string" ? data.image : data.image.src
            }
          />
        </div>
      </div>

      <div
        className={`flex flex-wrap items-center w-full lg:w-1/2 ${
          data.imgPos === "right" ? "lg:justify-end" : ""
        }`}
      >
        <div>
          <div className="flex flex-col w-full mt-4">
            <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
              {data.title}
            </h3>

            <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
              {data.desc}
            </p>
          </div>

          <div className="w-full mt-5">
            {data.bullets.map((item, index) => (
              <Benefit key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

function Benefit({ title, icon, desc }: BenefitProps) {
  return (
    <div className="flex items-start mt-8 space-x-3">
      <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-gray-500 rounded-md w-11 h-11 ">
        {React.cloneElement(icon, {
          className: "w-7 h-7 text-gray-50",
        })}
      </div>
      <div>
        <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
          {title}
        </h4>
        <p className="mt-1 text-gray-500 dark:text-gray-400">{desc}</p>
      </div>
    </div>
  );
}

export default Benefits;
