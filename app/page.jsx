/** @format */
"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import Slider from "../src/Components/layout/slider";
import CardComponent from "../src/Components/layout/Card";
import CardSkeleton from "../src/Components/layout/CardSkeleton";
import { usePosts } from "../src/Context/postContext";
import { siteConfig } from "../src/lib/siteConfig";

export default function Page() {
  const { posts, loading } = usePosts();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      document.title = `${siteConfig.brandAr} | مظلات وسواتر وخيام ملكي في القصيم بريدة عنيزة`;
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = siteConfig.description;
    }
  }, []);

  return (
    <main role='main'>
      <article>
        <Hero>
          <HeroGlow aria-hidden='true' />
          <HeroInner>
            <BrandMark>{siteConfig.brandAr}</BrandMark>
            <h1>مظلات وسواتر وخيام ملكي في القصيم</h1>
            <p>{siteConfig.tagline}</p>
            <Cities>{siteConfig.citiesLine}</Cities>
            <CtaRow>
              <WhatsappButton
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target='_blank'
                rel='noopener noreferrer'>
                تواصل واتساب
              </WhatsappButton>
              <CallButton href={`tel:${siteConfig.phonePrimary}`}>
                اتصل: {siteConfig.phonePrimary}
              </CallButton>
              <CallButton href={`tel:${siteConfig.phoneSecondary}`} $ghost>
                {siteConfig.phoneSecondary}
              </CallButton>
            </CtaRow>
          </HeroInner>
        </Hero>

        <Slider />

        <section aria-label='منتجاتنا'>
          {!mounted || loading ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </>
          ) : (
            posts.map((item, index) => (
              <CardComponent
                key={item.id || index}
                item={{
                  id: item.id,
                  cardImage: item.imageUrl,
                  cardTitle: item.title,
                  cardSpan: item.span,
                  cardAlt:
                    item.imageAlt ||
                    item.span ||
                    item.title ||
                    `${siteConfig.brandAr} - مظلات وسواتر`,
                }}
              />
            ))
          )}
        </section>
      </article>
    </main>
  );
}

const rise = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const Hero = styled.header`
  position: relative;
  overflow: hidden;
  margin: -20px -20px 1.5rem;
  padding: clamp(2.4rem, 6vw, 4.2rem) 1.25rem clamp(2rem, 5vw, 3.2rem);
  background:
    linear-gradient(145deg, rgba(6, 40, 32, 0.92) 0%, rgba(15, 76, 58, 0.88) 48%, rgba(8, 51, 40, 0.94) 100%),
    radial-gradient(ellipse at 20% 20%, rgba(212, 168, 75, 0.28), transparent 45%),
    url("/images/slider3.jpg") center / cover no-repeat;
  color: #fff;
  text-align: center;
  animation: ${rise} 0.7s ease both;

  @media (max-width: 640px) {
    margin: -12px -12px 1.25rem;
  }
`;

const HeroGlow = styled.div`
  position: absolute;
  inset: auto -10% -40% auto;
  width: 55%;
  height: 70%;
  background: radial-gradient(circle, rgba(232, 213, 163, 0.22), transparent 70%);
  pointer-events: none;
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 820px;
  margin: 0 auto;

  h1 {
    margin: 0.55rem 0 0.85rem;
    font-size: clamp(1.55rem, 4.2vw, 2.45rem);
    font-weight: 800;
    line-height: 1.25;
    color: #fff8e7;
    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.35);
  }

  p {
    margin: 0 auto;
    max-width: 46rem;
    font-size: clamp(0.95rem, 2.1vw, 1.08rem);
    line-height: 1.85;
    color: rgba(255, 248, 231, 0.92);
  }
`;

const BrandMark = styled.span`
  display: inline-block;
  font-size: clamp(1.85rem, 5vw, 3rem);
  font-weight: 900;
  letter-spacing: 0.02em;
  background: linear-gradient(90deg, #fff1b0, #f5c542, #d4a84b, #fff1b0);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${shimmer} 4s linear infinite;
  filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.35));
`;

const Cities = styled.p`
  margin: 0.9rem auto 0 !important;
  font-size: 0.92rem !important;
  color: #e8d5a3 !important;
  font-weight: 600;
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
  margin-top: 1.4rem;
`;

const WhatsappButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0.7rem 1.35rem;
  border-radius: 999px;
  background: #25d366;
  color: #fff !important;
  font-weight: 800;
  text-decoration: none !important;
  box-shadow: 0 10px 24px rgba(37, 211, 102, 0.28);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(37, 211, 102, 0.35);
    color: #fff !important;
  }
`;

const CallButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
  background: ${(p) => (p.$ghost ? "transparent" : "#d4a84b")};
  color: ${(p) => (p.$ghost ? "#fff8e7" : "#062820")} !important;
  border: 1.5px solid ${(p) => (p.$ghost ? "rgba(232, 213, 163, 0.55)" : "#d4a84b")};
  font-weight: 800;
  text-decoration: none !important;
  transition: transform 0.18s ease, background 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${(p) => (p.$ghost ? "rgba(255, 255, 255, 0.08)" : "#e8d5a3")};
    color: ${(p) => (p.$ghost ? "#fff8e7" : "#062820")} !important;
  }
`;
