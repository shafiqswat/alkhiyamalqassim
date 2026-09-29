/** @format */
"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import styled from "styled-components";
import { usePosts } from "../../../src/Context/postContext";

const WHATSAPP = "966500886893";

export default function ProductDetailsClient({ productId }) {
  const { posts, loading } = usePosts();

  const product = useMemo(() => {
    if (!productId || !posts?.length) return null;
    return posts.find((item) => item.id && item.id.toString() === productId) || null;
  }, [productId, posts]);

  useEffect(() => {
    if (product?.title) {
      document.title = `${product.title} | الخيام القصيم`;
    }
  }, [product]);

  if (loading) {
    return (
      <StateMsg>
        <div className='spinner' aria-hidden='true' />
        <p>جارٍ التحميل...</p>
      </StateMsg>
    );
  }

  if (!product) {
    return (
      <StateMsg>
        <p>المنتج غير موجود</p>
        <BackLink href='/'>العودة للرئيسية</BackLink>
      </StateMsg>
    );
  }

  const waText = encodeURIComponent(
    `مرحبا، أريد الاستفسار عن: ${product.title || ""}`
  );

  return (
    <ProductContainer>
      <Media>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={
              product.imageAlt ||
              product.span ||
              product.title ||
              "الخيام القصيم - مظلات وسواتر"
            }
          />
        ) : (
          <div className='placeholder'>لا توجد صورة</div>
        )}
      </Media>

      <Info>
        <BrandTag>الخيام القصيم</BrandTag>
        <h1>{product.title}</h1>
        {product.span ? <p className='span'>{product.span}</p> : null}
        {product.description ? (
          <p className='desc'>{product.description}</p>
        ) : (
          <p className='desc muted'>تواصل معنا لمزيد من التفاصيل والمقاسات والأسعار.</p>
        )}

        <Actions>
          <BuyButton
            href={`https://wa.me/${WHATSAPP}?text=${waText}`}
            target='_blank'
            rel='noopener noreferrer'>
            اطلب عبر واتساب
          </BuyButton>
          <CallButton href='tel:0500886893'>اتصل: 0500886893</CallButton>
          <CallButton href='tel:0534614146'>0534614146</CallButton>
        </Actions>
      </Info>
    </ProductContainer>
  );
}

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  align-items: start;
  padding: 1.25rem 1rem 2.5rem;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 0.75rem 0.75rem 2rem;
  }
`;

const Media = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(160deg, #f7f2f4 0%, #ebe6e8 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  aspect-ratio: 4 / 3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .placeholder {
    height: 100%;
    display: grid;
    place-items: center;
    color: #888;
  }

  @media (max-width: 600px) {
    aspect-ratio: 1 / 1;
    border-radius: 12px;
  }
`;

const Info = styled.div`
  text-align: right;
  padding: 0.25rem 0;

  h1 {
    font-size: clamp(1.35rem, 3.2vw, 2.1rem);
    color: #1a1a1a;
    margin: 0.35rem 0 0.75rem;
    line-height: 1.35;
    font-weight: 800;
  }

  .span {
    display: inline-block;
    margin: 0 0 1rem;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: rgba(142, 0, 59, 0.08);
    color: #0f4c3a;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .desc {
    font-size: 1.05rem;
    color: #444;
    line-height: 1.75;
    margin: 0 0 1.5rem;
  }

  .muted {
    color: #777;
  }

  @media (max-width: 860px) {
    text-align: center;

    .span {
      margin-inline: auto;
    }
  }
`;

const BrandTag = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  color: #0f4c3a;
  font-weight: 700;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 860px) {
    justify-content: center;
  }
`;

const BuyButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #25d366;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.85rem 1.35rem;
  font-size: 1.05rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 8px 18px rgba(37, 211, 102, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(37, 211, 102, 0.35);
    color: #fff;
  }
`;

const CallButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #0f4c3a;
  color: #fff;
  border-radius: 12px;
  padding: 0.85rem 1.35rem;
  font-size: 1.05rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #6e002e;
    color: #fff;
  }
`;

const StateMsg = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #555;

  .spinner {
    width: 36px;
    height: 36px;
    margin: 0 auto 1rem;
    border: 3px solid #eee;
    border-top-color: #0f4c3a;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 0.75rem;
  color: #0f4c3a;
  font-weight: 700;
`;
