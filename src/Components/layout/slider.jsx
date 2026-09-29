/** @format */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

const slides = [
  {
    src: "/images/slider3.webp",
    fallback: "/images/slider3.jpg",
    alt: "مظلات سيارات عالية الجودة في القصيم بريدة عنيزة - الخيام القصيم",
  },
  {
    src: "/images/slider4.webp",
    fallback: "/images/slider4.jpg",
    alt: "سواتر حديد وقماش وبلاستيك للمدارس والمساجد في القصيم",
  },
  {
    src: "/images/slider5.webp",
    fallback: "/images/slider5.jpg",
    alt: "جلسات وبرجولات بخامات فاخرة - الخيام القصيم بريدة",
  },
  {
    src: "/images/slider6.webp",
    fallback: "/images/slider6.jpg",
    alt: "خيام ملكي تفصيل وتركيب في عنيزة والرس والبكيرية",
  },
  {
    src: "/images/slider7.webp",
    fallback: "/images/slider7.jpg",
    alt: "مظلات حدائق ومداخل ومدارس وأسواق - الخيام القصيم",
  },
];

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => go(1), 5500);
    return () => clearInterval(id);
  }, [paused, go]);

  return (
    <Shell
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription='carousel'
      aria-label='معرض أعمال الخيام القصيم'>
      <Frame>
        {slides.map((slide, i) => {
          const near = Math.abs(i - index) <= 1 || (index === 0 && i === slides.length - 1);
          if (!near && i !== index) return null;
          return (
            <Slide
              key={slide.src}
              $active={i === index}
              aria-hidden={i !== index}>
              <picture>
                <source
                  srcSet={slide.src}
                  type='image/webp'
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.fallback}
                  alt={slide.alt}
                  width={900}
                  height={360}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding='async'
                  fetchPriority={i === 0 ? "high" : "low"}
                />
              </picture>
            </Slide>
          );
        })}
        <Scrim aria-hidden='true' />
      </Frame>

      <Nav
        type='button'
        $side='prev'
        aria-label='السابق'
        onClick={() => go(-1)}>
        ‹
      </Nav>
      <Nav
        type='button'
        $side='next'
        aria-label='التالي'
        onClick={() => go(1)}>
        ›
      </Nav>

      <Dots
        role='tablist'
        aria-label='شرائح المعرض'>
        {slides.map((slide, i) => (
          <Dot
            key={slide.src}
            type='button'
            role='tab'
            aria-selected={i === index}
            aria-label={`شريحة ${i + 1}`}
            $active={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </Dots>
    </Shell>
  );
}

const Shell = styled.section`
  position: relative;
  width: 100%;
  height: 280px;
  margin: 0 0 1.5rem;
  border-radius: 14px;
  overflow: hidden;
  background: #0a2e24;
  box-shadow: 0 8px 24px rgba(6, 40, 32, 0.14);
  contain: strict;
  content-visibility: auto;
  contain-intrinsic-size: 280px;

  @media (min-width: 768px) {
    height: 360px;
    contain-intrinsic-size: 360px;
  }

  @media (max-width: 600px) {
    height: 200px;
    margin-bottom: 1rem;
    border-radius: 12px;
    contain-intrinsic-size: 200px;
  }
`;

const Frame = styled.div`
  position: absolute;
  inset: 0;
`;

const Slide = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${(p) => (p.$active ? 1 : 0)};
  transition: opacity 0.55s ease;
  pointer-events: none;

  picture,
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to top, rgba(6, 40, 32, 0.4), transparent 45%);
`;

const Nav = styled.button`
  position: absolute;
  top: 50%;
  ${(p) => (p.$side === "prev" ? "left: 10px;" : "right: 10px;")}
  transform: translateY(-50%);
  z-index: 2;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(6, 40, 32, 0.65);
  color: #fff8e7;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  display: grid;
  place-items: center;
`;

const Dots = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  gap: 6px;
`;

const Dot = styled.button`
  width: ${(p) => (p.$active ? "18px" : "8px")};
  height: 8px;
  border: none;
  border-radius: 999px;
  padding: 0;
  cursor: pointer;
  background: ${(p) => (p.$active ? "#d4a84b" : "rgba(255, 248, 231, 0.55)")};
`;
