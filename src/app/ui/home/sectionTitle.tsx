import React from "react";
import Container from "./container";

interface SectionTitleProps {
  align?: "left" | "center";
  pretitle?: string;
  title?: string;
  children?: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  return (
    <Container
      className={`flex w-full flex-col mt-4 ${
        props.align === "left" ? "" : "items-center justify-center text-center"
      }`}
    >
      {props.pretitle && (
        <div className="text-sm font-bold tracking-wider uppercase">
          {props.pretitle}
        </div>
      )}

      {props.title && (
        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight lg:leading-tight lg:text-4xl ">
          {props.title}
        </h2>
      )}

      {props.children && (
        <p className="max-w-2xl py-4 text-lg leading-normal lg:text-xl xl:text-xl">
          {props.children}
        </p>
      )}
    </Container>
  );
};

export default SectionTitle;
