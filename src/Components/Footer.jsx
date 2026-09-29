/** @format */
"use client";

import React from "react";
import styled from "styled-components";
import { siteConfig } from "../lib/siteConfig";

function Footer() {
  return (
    <Wrap className='footer-wrapper'>
      <footer aria-label='Website Footer'>
        <BrandBlock>
          <strong>{siteConfig.brandAr}</strong>
          <span>{siteConfig.brandEn}.com</span>
        </BrandBlock>
        <p>{siteConfig.tagline}</p>
        <Cities>{siteConfig.citiesLine}</Cities>
        <Links>
          <a href={`tel:${siteConfig.phonePrimary}`}>{siteConfig.phonePrimary}</a>
          <a href={`tel:${siteConfig.phoneSecondary}`}>{siteConfig.phoneSecondary}</a>
          <a href={`mailto:${siteConfig.emailPrimary}`}>{siteConfig.emailPrimary}</a>
          <a
            href={siteConfig.instagram}
            target='_blank'
            rel='noopener noreferrer'>
            Instagram
          </a>
          <a
            href={siteConfig.snapchat}
            target='_blank'
            rel='noopener noreferrer'>
            Snapchat
          </a>
        </Links>
        <Copy>
          {siteConfig.brandAr} © {new Date().getFullYear()} — جميع الحقوق محفوظة
        </Copy>
        <a
          href='#'
          className='back-to-top'
          aria-label='Back to top'>
          <span className='typcn typcn-large typcn-arrow-up-thick'></span>
        </a>
      </footer>
    </Wrap>
  );
}

export default Footer;

const Wrap = styled.div`
  margin-top: 1.5rem;

  footer {
    background: linear-gradient(160deg, #062820 0%, #0f4c3a 55%, #083328 100%);
    color: #f8f1df;
    padding: 2rem 1.25rem 4.5rem;
    text-align: center;
    border-top: 3px solid #d4a84b;
  }

  p {
    max-width: 52rem;
    margin: 0.75rem auto;
    line-height: 1.8;
    color: rgba(248, 241, 223, 0.9);
    font-size: 0.95rem;
  }
`;

const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;

  strong {
    font-size: 1.35rem;
    color: #f5c542;
  }

  span {
    font-size: 0.85rem;
    opacity: 0.8;
    letter-spacing: 0.04em;
  }
`;

const Cities = styled.p`
  color: #e8d5a3 !important;
  font-weight: 600;
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.1rem;
  justify-content: center;
  margin: 1.1rem 0;

  a {
    color: #fff8e7 !important;
    text-decoration: none !important;
    font-weight: 700;
    border-bottom: 1px solid rgba(212, 168, 75, 0.45);
    padding-bottom: 2px;

    &:hover {
      color: #f5c542 !important;
    }
  }
`;

const Copy = styled.p`
  margin-top: 1rem !important;
  font-size: 0.85rem !important;
  opacity: 0.75;
`;
