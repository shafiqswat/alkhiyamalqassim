/** @format */

import React from "react";
import Header from "../Header";
import styled from "styled-components";
import Footer from "../Footer";
import BreadCrumb from "../BreadCrumb";
import Ticker from "../Ticker";
import { useLocation } from "react-router-dom";

function Dashboard({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const showBreadCrumb = currentPath !== "/";

  return (
    <DashboardContainer role='main'>
      <Header />
      <ContentArea id='center'>
        {showBreadCrumb && <BreadCrumb currentPath={currentPath} />}
        {children}
      </ContentArea>
      <Ticker />
      <Footer />
    </DashboardContainer>
  );
}

export default Dashboard;

const DashboardContainer = styled.div`
  overflow: hidden;
  background-color: #f0f0f0;
`;

const ContentArea = styled.main`
  padding: 20px;
  /* Additional styles for better readability */
  background-color: #fff; /* For contrast */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
