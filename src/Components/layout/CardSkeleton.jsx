/** @format */
import React from "react";
import styled from "styled-components";

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
    background: #ffffff !important;
    box-shadow: 0px 0px 5px #969696;
    line-height: 1.4;
  }

  .imageWrapper {
    overflow: hidden;

    .skeletonImage {
      width: 100%;
      height: 200px;
      background: #e8e4dc;
    }
  }

  .cardTitle {
    padding: 10px 1.5%;
    height: 40px;
    margin-top: -40px;
    position: relative;
    z-index: 3;
    background: rgba(0, 0, 0, 0.45);

    .skeletonSpan {
      height: 16px;
      width: 60%;
      background: rgba(255, 255, 255, 0.35);
      border-radius: 4px;
    }
  }

  .titleContent {
    .title {
      padding: 10px;
      height: 60px;

      .skeletonTitle,
      .skeletonTitleLine {
        height: 14px;
        width: 90%;
        background: #ebe7df;
        border-radius: 4px;
        margin-bottom: 8px;
      }

      .skeletonTitleLine.short {
        width: 70%;
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
