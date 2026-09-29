/** @format */
"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { siteConfig } from "../lib/siteConfig";

export default function BrandLogo({ compact = false }) {
  return (
    <LogoLink
      href='/'
      aria-label={siteConfig.brandAr}
      $compact={compact}>
      <Mark
        aria-hidden='true'
        $compact={compact}>
        <svg
          viewBox='0 0 64 64'
          width='100%'
          height='100%'>
          <defs>
            <linearGradient
              id='brandGold'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='100%'>
              <stop
                offset='0%'
                stopColor='#FFF1B0'
              />
              <stop
                offset='40%'
                stopColor='#F5C542'
              />
              <stop
                offset='100%'
                stopColor='#B8860B'
              />
            </linearGradient>
            <linearGradient
              id='brandShade'
              x1='50%'
              y1='0%'
              x2='50%'
              y2='100%'>
              <stop
                offset='0%'
                stopColor='#0f4c3a'
              />
              <stop
                offset='100%'
                stopColor='#062820'
              />
            </linearGradient>
          </defs>
          <rect
            x='2'
            y='2'
            width='60'
            height='60'
            rx='14'
            fill='url(#brandShade)'
          />
          <path
            fill='url(#brandGold)'
            d='M32 10c-9.4 0-17 5.4-17 12.1 0 3.6 2 6.8 5.2 9L17 52h11.2l1.8-10.2h5.9L37.8 52H49l-3.2-20.9c3.2-2.2 5.2-5.4 5.2-9C51 15.4 43.4 10 32 10Zm0 5.4c5.9 0 10.6 3.1 10.6 6.7S37.9 29 32 29s-10.6-3.2-10.6-6.9S26.1 15.4 32 15.4Z'
          />
          <circle
            cx='32'
            cy='22'
            r='2.6'
            fill='#062820'
          />
          <path
            fill='url(#brandGold)'
            opacity='0.85'
            d='M20 54h24c0 0-3.2 4-12 4s-12-4-12-4Z'
          />
        </svg>
      </Mark>
      <TextBlock $compact={compact}>
        <BrandName $compact={compact}>{siteConfig.brandAr}</BrandName>
        <PhoneRow $compact={compact}>
          <PhoneDot aria-hidden='true' />
          <Phone>{siteConfig.phonePrimary}</Phone>
        </PhoneRow>
      </TextBlock>
    </LogoLink>
  );
}

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${(p) => (p.$compact ? "8px" : "12px")};
  text-decoration: none !important;
  color: inherit;
  max-width: 100%;
  padding: ${(p) => (p.$compact ? "4px 6px" : "5px 8px 5px 5px")};
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    rgba(245, 197, 66, 0.1) 0%,
    rgba(15, 76, 58, 0.18) 100%
  );
  border: 1px solid rgba(245, 197, 66, 0.32);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transition: transform 0.15s ease, border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    border-color: rgba(245, 197, 66, 0.6);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
    color: inherit;
  }
`;

const Mark = styled.span`
  width: ${(p) => (p.$compact ? "36px" : "44px")};
  height: ${(p) => (p.$compact ? "36px" : "44px")};
  flex-shrink: 0;
  display: grid;
  place-items: center;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.35));

  @media (max-width: 600px) {
    width: 34px;
    height: 34px;
  }
`;

const TextBlock = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(p) => (p.$compact ? "2px" : "4px")};
  min-width: 0;
  line-height: 1.1;
  padding-inline-end: 4px;
`;

const BrandName = styled.span`
  color: #f7d56a;
  font-size: ${(p) =>
    p.$compact ? "0.86rem" : "clamp(0.9rem, 1.45vw, 1.12rem)"};
  font-weight: 800 !important;
  white-space: nowrap;
  letter-spacing: 0.01em;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
`;

const PhoneRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const PhoneDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #25d366;
  box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.18);
  flex-shrink: 0;
`;

const Phone = styled.span`
  color: rgba(255, 255, 255, 0.95);
  font-size: ${(p) => (p.$compact ? "0.72rem" : "0.8rem")};
  font-weight: 700 !important;
  letter-spacing: 0.06em;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
`;
