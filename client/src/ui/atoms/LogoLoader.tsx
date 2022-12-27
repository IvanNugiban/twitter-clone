import React from 'react';
import styled from "styled-components";
import AppLogo from "./AppLogo";
import themeEnum from "../../types/enums/ThemeEnum";

const LogoLoaderWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1500;
  background-color: ${({theme}) => theme.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`


const LogoLoader = () => {
    return (
        <LogoLoaderWrapper>
        <AppLogo fontSize="5rem"/>
        </LogoLoaderWrapper>
    );
};

export default LogoLoader;