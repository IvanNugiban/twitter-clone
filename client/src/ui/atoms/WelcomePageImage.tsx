import React from 'react';
import WelcomePageImg from "../../assets/WelcomePage.png"
import AppLogo from "./AppLogo";
import styled from "styled-components";



const Wrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: inline-block;
  
  img {
    height: 100%;
    width: 55vw;
    object-fit: cover;
  }

  @media screen and ${({theme}) => theme.media.laptop} {
    img {
      height: 40vh;
      width: 100vw;
    }
  }
`

const CenteredTwitterLogo = styled(AppLogo).attrs(props => ({
    color: props.theme.colors.white,
    fontSize: "20vw"
}))`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`

const WelcomePageImage = () => {
    return (
        <Wrapper>
            <img alt="Welcome" src={WelcomePageImg}/>
            <CenteredTwitterLogo/>
        </Wrapper>
    );
};

export default WelcomePageImage;