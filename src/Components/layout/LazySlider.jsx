/** @format */
"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

const SliderInner = dynamic(() => import("./slider"), {
  ssr: false,
  loading: () => <Placeholder aria-hidden='true' />,
});

/** Defer gallery until near viewport — keeps mobile FCP/LCP on hero text */
export default function LazySlider() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show ? <SliderInner /> : <Placeholder aria-hidden='true' />}
    </div>
  );
}

const Placeholder = styled.div`
  width: 100%;
  height: 200px;
  margin: 0 0 1.5rem;
  border-radius: 12px;
  background: #0a2e24;

  @media (min-width: 768px) {
    height: 360px;
  }
`;
