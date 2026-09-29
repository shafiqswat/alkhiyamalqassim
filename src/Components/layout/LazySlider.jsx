/** @format */
"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SliderInner from "./slider";

/** Defer gallery until near viewport — keeps mobile LCP on hero */
export default function LazySlider() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Wrap ref={ref}>
      {show ? <SliderInner /> : <Placeholder aria-hidden='true' />}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  min-height: 200px;
  margin: 0 0 1.5rem;

  @media (min-width: 768px) {
    min-height: 360px;
  }

  @media (max-width: 600px) {
    margin-bottom: 1rem;
    min-height: 200px;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background: #0a2e24;

  @media (min-width: 768px) {
    height: 360px;
    border-radius: 14px;
  }
`;
