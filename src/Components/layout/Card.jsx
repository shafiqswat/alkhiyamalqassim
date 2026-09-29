/** @format */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { optimizeImageUrl } from "../../helpers/optimizeImage";

function CardComponent({ item, hideImage = false, priority = false }) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const textToShare = encodeURIComponent(item.cardTitle || "");
  const urlToShare = encodeURIComponent(currentUrl);
  const router = useRouter();
  const imageSrc = optimizeImageUrl(item.cardImage, { width: 400, height: 280 });

  const handleClick = () => {
    router.push(`/product/${item.id}`);
  };

  const handleShare = (platform) => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${urlToShare}&text=${textToShare}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${urlToShare}`;
        break;
      case "instagram":
        alert(
          "Instagram does not support direct URL sharing. Please share via the app."
        );
        return;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <CardContainer onClick={handleClick}>
      <div className='cardContent'>
        {!hideImage && item.cardImage ? (
          <>
            <div className='imageWrapper'>
              <img
                src={imageSrc}
                alt={
                  item.cardAlt ||
                  item.cardSpan ||
                  item.cardTitle ||
                  "الخيام القصيم - مظلات وسواتر"
                }
                width={400}
                height={280}
                loading='lazy'
                decoding='async'
                fetchPriority='low'
              />
              <div className='imageOverlay' />
              <ShareWrap
                className='titleIcon'
                onClick={(e) => e.stopPropagation()}>
                <button
                  type='button'
                  className='titleShare'
                  aria-label='مشاركة'
                  tabIndex={0}>
                  <ShareIcon />
                </button>
                <div className='dropDownContent'>
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare("facebook");
                }}
                aria-label='Share on Facebook'>
                <svg
                  className='socialicon'
                  viewBox='0 0 24 24'
                  aria-hidden='true'>
                  <path
                    fill='currentColor'
                    d='M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5 3.66 9.14 8.44 9.93v-7.02H7.91v-2.91h2.39V9.41c0-2.36 1.4-3.66 3.55-3.66 1.03 0 2.12.18 2.12.18v2.33h-1.2c-1.18 0-1.55.73-1.55 1.48v1.77h2.64l-.42 2.91h-2.22V22c4.78-.79 8.44-4.93 8.44-9.93Z'
                  />
                </svg>
              </button>
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare("twitter");
                }}
                aria-label='Share on Twitter'>
                <svg
                  className='socialicon'
                  viewBox='0 0 24 24'
                  aria-hidden='true'>
                  <path
                    fill='currentColor'
                    d='M22.46 6c-.77.35-1.6.58-2.46.69.89-.53 1.57-1.37 1.89-2.37-.83.49-1.75.85-2.72 1.04A4.13 4.13 0 0 0 15.5 4c-2.28 0-4.13 1.89-4.13 4.22 0 .33.03.65.1.96-3.43-.18-6.46-1.88-8.49-4.46-.36.64-.57 1.38-.57 2.17 0 1.5.74 2.83 1.86 3.61-.68-.02-1.32-.22-1.87-.52v.05c0 2.09 1.44 3.83 3.36 4.23-.35.1-.72.15-1.11.15-.27 0-.53-.03-.78-.08.53 1.73 2.09 2.98 3.93 3.01A8.3 8.3 0 0 1 2 19.54 11.72 11.72 0 0 0 8.29 21c7.55 0 11.68-6.43 11.68-12 0-.18 0-.37-.01-.55.8-.6 1.49-1.35 2.05-2.21Z'
                  />
                </svg>
              </button>
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare("linkedin");
                }}
                aria-label='Share on LinkedIn'>
                <svg
                  className='socialicon'
                  viewBox='0 0 24 24'
                  aria-hidden='true'>
                  <path
                    fill='currentColor'
                    d='M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7 0h3.83v2.05h.05c.53-1 1.82-2.05 3.74-2.05 4 0 4.74 2.63 4.74 6.06V23h-4v-7.03c0-1.68-.03-3.84-2.34-3.84-2.34 0-2.7 1.83-2.7 3.72V23h-4V8Z'
                  />
                </svg>
              </button>
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare("instagram");
                }}
                aria-label='Share on Instagram'>
                <svg
                  className='socialicon'
                  viewBox='0 0 24 24'
                  aria-hidden='true'>
                  <path
                    fill='currentColor'
                    d='M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z'
                  />
                </svg>
              </button>
                </div>
              </ShareWrap>
              {item.cardSpan ? (
                <div className='cardTitle'>
                  <span>{item.cardSpan}</span>
                </div>
              ) : null}
            </div>
          </>
        ) : null}
        <div className='titleContent'>
          <div className='title'>
            <h2>
              <strong>{item.cardTitle}</strong>
            </h2>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}

export default CardComponent;

const ShareIcon = () => (
  <svg
    viewBox='0 0 24 24'
    width='18'
    height='18'
    aria-hidden='true'>
    <path
      fill='currentColor'
      d='M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.27 3.27 0 0 0 0-1.39l7.05-4.11A2.99 2.99 0 1 0 14 5a2.99 2.99 0 0 0 .04.49L7 9.6a3 3 0 1 0 0 4.8l7.05 4.11c.14.88.88 1.49 1.95 1.49a2 2 0 1 0-.02-4Z'
    />
  </svg>
);

const ShareWrap = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 4;
`;

const CardContainer = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 0 0.5%;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  overflow: visible;
  font-size: 1rem;

  &:hover,
  &:focus-within {
    z-index: 50;

    .cardContent {
      overflow: visible;
    }
  }

  .cardContent {
    max-width: 100%;
    margin: 0 0 3% 0;
    height: fit-content;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    line-height: 1.4;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    position: relative;
  }

  &:hover .cardContent,
  &:focus-within .cardContent {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(142, 0, 59, 0.14);
  }

  .imageWrapper {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: #f3f3f3;
    border-radius: 14px 14px 0 0;

    img {
      width: 100%;
      height: 100%;
      vertical-align: bottom;
      transition: transform 0.45s ease;
      object-fit: cover;
    }

    .imageOverlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.45) 0%,
        transparent 55%
      );
      pointer-events: none;
    }
  }

  .cardTitle {
    padding: 8px 12px;
    min-height: 36px;
    z-index: 3;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    color: #fff;
    display: flex;
    align-items: center;
    pointer-events: none;

    span {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 85%;
      font-size: 0.9rem;
      font-weight: 600;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
    }
  }

  .imageWrapper .titleIcon {
    .titleShare {
      cursor: pointer;
      margin: 0;
      padding: 0;
      border: none;
      color: #fff;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(15, 76, 58, 0.92);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    }

    &:hover .dropDownContent,
    .dropDownContent:hover,
    &:focus-within .dropDownContent {
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    }

    .dropDownContent {
      width: 44px;
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      bottom: calc(100% + 8px);
      left: 0;
      background-color: #fff;
      border: 1px solid #e8e8e8;
      border-radius: 10px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);
      transition: opacity 0.2s ease, visibility 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 6px 0;
      z-index: 100;

      button {
        all: unset;
        cursor: pointer;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }

      .socialicon {
        height: 22px;
        width: 22px;
        margin: 0;
        transition: transform 0.25s ease, color 0.2s ease;
        display: block;
        color: #444;
      }

      .socialicon:hover {
        transform: scale(1.12);
        color: #0f4c3a;
      }
    }
  }

  .titleContent {
    display: block;
    padding: 4px 4px 8px;

    .title {
      color: #1a1a1a;
      padding: 10px 12px 12px;
      min-height: 56px;
      flex: 1;
      text-align: right;

      h2 {
        padding: 0;
        margin: 0;
        font-size: 0.98rem;
        line-height: 1.45;
        max-height: calc(1.45em * 2);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-word;
        font-weight: 700;
      }
    }
  }

  :hover .imageWrapper img {
    transform: scale(1.06);
  }

  @media (min-width: 900px) {
    width: 33.333%;
    display: inline-grid;
  }

  @media (max-width: 900px) and (min-width: 601px) {
    width: 50%;
    display: inline-grid;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0;
    display: block;

    .cardContent {
      margin-bottom: 14px;
      border-radius: 12px;
    }

    .imageWrapper {
      border-radius: 12px 12px 0 0;
    }

    .title .h2,
    .title h2 {
      font-size: 0.95rem;
    }
  }
`;
