import React from 'react';
import styled from "styled-components";
import WelcomePageImage from "../ui/atoms/WelcomePageImage";
import AuthSection from "../ui/organism/AuthSection";
import DocumentTitle from "react-document-title"

const StyledWelcomePage = styled.div`
  display: flex;
  gap: 0 35px;
  min-height: 100vh;
  
  @media screen and ${({theme}) => theme.media.laptop} {
    flex-direction: column-reverse;
  }

  @media screen and ${({theme}) => theme.media.mobile} {
   word-break: break-all;
  }
`

const WelcomePage = () => {
    return (
        <StyledWelcomePage>
            <DocumentTitle title="Twitter. Everything is discussed here"/>
            <WelcomePageImage/>
            <AuthSection/>
        </StyledWelcomePage>
    );
};

export default WelcomePage;