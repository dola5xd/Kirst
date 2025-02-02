"use client";
import ReactLenis from "lenis/react";
import React, { PropsWithChildren } from "react";

const Lenis = ({ children }: PropsWithChildren) => {
  return (
    <ReactLenis options={{ duration: 2 }} root>
      {children}
    </ReactLenis>
  );
};

export default Lenis;
