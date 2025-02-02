"use client";

import { ReactElement, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

function AosSection({
  children,
  className,
}: {
  children: ReactElement | ReactElement[];
  className?: string;
}) {
  useEffect(() => {
    AOS.init({ offset: 0 });
  }, []);

  return <section className={className}>{children}</section>;
}

export default AosSection;
