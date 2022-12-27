import React from 'react';
import styled from "styled-components";

const StyledHorizontalLoader = styled.span`
    width: 100%;
    height: 4px;
    display: inline-block;
    position: relative;
    background: rgba(255, 255, 255, 0.15);
    overflow: hidden;
  
  &::after {
    content: '';
    width: 100px;
    height: 4.8px;
    background: ${({theme}) => theme.colors.main};
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    animation: animloader 1.2s linear infinite;
  }
  
  @keyframes animloader {
    0% {
      left: 0;
      transform: translateX(-100%);
    }
    100% {
      left: 100%;
      transform: translateX(0%);
    }
  }
`

interface IProps {
    className?: string;
}

const HorizontalLoader = ({className} : IProps) => {
    return <StyledHorizontalLoader className={className}/>
};

export default HorizontalLoader;