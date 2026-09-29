/** @format */
import React from "react";
import styled from "styled-components";

const CardSkeleton = () => {
  return (
    <SkeletonContainer>
      <div className='cardContent'>
        <div className='imageWrapper'>
          <div className='skeletonImage' />
        </div>
        <div className='titleContent'>
          <div className='title'>
            <div className='skeletonTitle' />
            <div className='skeletonTitleLine' />
            <div className='skeletonTitleLine short' />
          </div>
        </div>
      </div>
    </SkeletonContainer>
  );
};

export default CardSkeleton;

const SkeletonContainer = styled.div`
  cursor: default;
  width: 100%;
  padding: 0 0.5%;
  box-sizing: border-box;
  font-size: 1rem;

  .cardContent {
    max-width: 100%;
    margin: 0 0 3% 0;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    line-height: 1.4;
  }

  .imageWrapper {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: #ebe7df;
    border-radius: 14px 14px 0 0;

    .skeletonImage {
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        #ebe7df 0%,
        #f5f2eb 50%,
        #ebe7df 100%
      );
      background-size: 200% 100%;
      animation: skeletonPulse 1.4s ease-in-out infinite;
    }
  }

  .titleContent {
    padding: 4px 4px 8px;

    .title {
      padding: 10px 12px 12px;
      min-height: 56px;

      .skeletonTitle,
      .skeletonTitleLine {
        height: 14px;
        width: 92%;
        background: #ebe7df;
        border-radius: 4px;
        margin-bottom: 8px;
      }

      .skeletonTitleLine.short {
        width: 68%;
        margin-bottom: 0;
      }
    }
  }

  @keyframes skeletonPulse {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
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
  }
`;
