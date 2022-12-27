import React from 'react';
import styled from "styled-components";
import Title from "../atoms/Typography/Title";
import SubTitle from "../atoms/Typography/SubTitle";
import AppLogo from "../atoms/AppLogo";
import LoginOrRegister from "../molecules/LoginOrRegister";

const StyledAuthSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  
  .twitter-logo {
    margin-bottom: 100px;
  }
  


  @media screen and ${({theme}) => theme.media.laptop} {
    padding: 20px;
    align-items: center;
    text-align: center;
    .twitter-logo {
      margin-bottom: 20px;
    }
  }
`

const JoinTwitterSubTitle = styled(SubTitle)`
  margin: 80px 0 60px 0;
`

const AuthSection = () => {
    return (
        <StyledAuthSection>
            <AppLogo className="twitter-logo" fontSize="3.5rem"/>
            <Title>Happening now</Title>
            <JoinTwitterSubTitle>Join twitter today.</JoinTwitterSubTitle>
            <LoginOrRegister/>
        </StyledAuthSection>
    );
};

export default AuthSection;