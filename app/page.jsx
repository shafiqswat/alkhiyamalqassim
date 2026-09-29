/** @format */
"use client";

import React from "react";
import styled from "styled-components";
import LazySlider from "../src/Components/layout/LazySlider";
import CardComponent from "../src/Components/layout/Card";
import CardSkeleton from "../src/Components/layout/CardSkeleton";
import { usePosts } from "../src/Context/postContext";
import { siteConfig } from "../src/lib/siteConfig";
import { optimizeImageUrl } from "../src/helpers/optimizeImage";

const PAGE_SIZE = 6;

export default function Page() {
  const { posts, loading } = usePosts();
  const [visible, setVisible] = React.useState(PAGE_SIZE);

  React.useEffect(() => {
    document.title = `${siteConfig.brandAr} | مظلات وسواتر وخيام ملكي في القصيم بريدة عنيزة`;
  }, []);

  const shown = posts.slice(0, visible);
  const showGrid = posts.length > 0;

  return (
    <main role='main'>
      <article>
        <Hero>
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

        <LazySlider />

        <ProductsSection aria-label='منتجاتنا' $ready={showGrid}>
          {showGrid ? (
            <>
              {shown.map((item, index) => (
                <CardComponent
                  key={item.id || index}
                  item={{
                    id: item.id,
                    cardImage: optimizeImageUrl(item.imageUrl, {
                      width: 360,
                      height: 240,
                    }),
                    cardTitle: item.title,
                    cardSpan: item.span,
                    cardAlt:
                      item.imageAlt ||
                      item.span ||
                      item.title ||
                      `${siteConfig.brandAr} - مظلات وسواتر`,
                  }}
                />
              ))}
              {visible < posts.length ? (
                <LoadMoreWrap>
                  <LoadMore
                    type='button'
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    عرض المزيد ({posts.length - visible})
                  </LoadMore>
                </LoadMoreWrap>
              ) : null}
            </>
          ) : loading ? (
            <>
              {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </>
          ) : null}
        </ProductsSection>
      </article>
    </main>
  );
}

const ProductsSection = styled.section`
  width: 100%;
  font-size: 0;
`;

const Hero = styled.header`
  position: relative;
  overflow: hidden;
  margin: -20px -20px 1.5rem;
  padding: clamp(2rem, 5vw, 3.4rem) 1.25rem;
  background:
    radial-gradient(ellipse at 20% 10%, rgba(212, 168, 75, 0.22), transparent 50%),
    linear-gradient(145deg, #062820 0%, #0f4c3a 55%, #083328 100%);
  color: #fff;
  text-align: center;
  min-height: 280px;

  @media (max-width: 640px) {
    margin: -12px -12px 1.25rem;
    min-height: 320px;
  }
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
  color: #f5c542;
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
  min-height: 48px;
  min-width: 48px;
  padding: 0.75rem 1.35rem;
  border-radius: 999px;
  background: #0a6b38;
  color: #ffffff !important;
  font-weight: 800;
  text-decoration: none !important;
  box-shadow: 0 2px 0 #064526;
`;

const CallButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  min-width: 48px;
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
  background: ${(p) => (p.$ghost ? "transparent" : "#d4a84b")};
  color: ${(p) => (p.$ghost ? "#fff8e7" : "#062820")} !important;
  border: 1.5px solid
    ${(p) => (p.$ghost ? "rgba(232, 213, 163, 0.55)" : "#d4a84b")};
  font-weight: 800;
  text-decoration: none !important;
`;

const LoadMoreWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 0 0.5rem;
`;

const LoadMore = styled.button`
  border: none;
  background: #0f4c3a;
  color: #fff;
  font-weight: 800;
  min-height: 48px;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  cursor: pointer;
`;
