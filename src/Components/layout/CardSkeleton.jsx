/** @format */
import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const CardSkeleton = () => {
  return (
    <SkeletonContainer>
      <div className='cardContent'>
        <div className='imageWrapper'>
          <div className='skeletonImage'></div>
        </div>
        <div className='cardTitle'>
          <div className='skeletonSpan'></div>
        </div>
        <div className='titleContent'>
          <div className='titleIcon'>
            <div className='skeletonShare'></div>
          </div>
          <div className='title'>
            <div className='skeletonTitle'></div>
            <div className='skeletonTitleLine'></div>
            <div className='skeletonTitleLine short'></div>
          </div>
        </div>
      </div>
    </SkeletonContainer>
  );
};

export default CardSkeleton;

const SkeletonContainer = styled.div`
  width: 100%;

  .cardContent {
    max-width: 97%;
    margin: 0 0 3% 0;
    height: fit-content;
    background: #ffffff !important;
    box-shadow: 0px 0px 5px #969696;
    line-height: 1.4;
  }

  .imageWrapper {
    position: relative;
    overflow: hidden;

    .skeletonImage {
      width: 100%;
      height: 200px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200px 100%;
      animation: ${shimmer} 1.5s infinite;
    }
  }

  .cardTitle {
    padding: 10px 1.5% 10px 1.5%;
    height: 40px;
    z-index: 3;
    position: relative;
    color: #fff;
    margin-top: -40px;
    background: rgba(0, 0, 0, 0.5);

    .skeletonSpan {
      height: 16px;
      width: 60%;
      background: linear-gradient(90deg, #ccc 25%, #bbb 50%, #ccc 75%);
      background-size: 200px 100%;
      animation: ${shimmer} 1.5s infinite;
      border-radius: 4px;
    }
  }

  .titleContent {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;

    .titleIcon {
      font-size: 1.5em;
      position: relative;
      padding: 0 5px;
      opacity: 0.9;
      z-index: 5;
      text-align: center;
      height: 40px;
      margin-top: -60px;

      .skeletonShare {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(90deg, #ccc 25%, #bbb 50%, #ccc 75%);
        background-size: 200px 100%;
        animation: ${shimmer} 1.5s infinite;
        margin-top: 1em;
      }
    }

    .title {
      color: #000000;
      padding: 10px;
      height: 60px;
      text-align: justify;

      .skeletonTitle {
        height: 18px;
        width: 90%;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200px 100%;
        animation: ${shimmer} 1.5s infinite;
        border-radius: 4px;
        margin-bottom: 8px;
      }

      .skeletonTitleLine {
        height: 16px;
        width: 100%;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200px 100%;
        animation: ${shimmer} 1.5s infinite;
        border-radius: 4px;
        margin-bottom: 6px;

        &.short {
          width: 70%;
        }
      }
    }
  }

  @media (min-width: 900px) {
    width: 33.3%;
    display: inline-grid;
  }

  @media (max-width: 900px) and (min-width: 601px) {
    width: 50%;
    display: inline-grid;
  }

  @media (max-width: 600px) {
    .cardContent {
      max-width: 100%;
    }
  }
`;
