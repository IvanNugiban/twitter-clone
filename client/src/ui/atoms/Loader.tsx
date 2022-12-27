import React from 'react';
import styled, {keyframes} from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(204, 204, 204, 0.74);
`

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoader = styled.div`
  flex-basis: 64px;

  div {
    position: absolute;
    width: 64px;
    height: 64px;
    border: 8px solid ${({theme}) => theme.colors.white};
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({theme}) => theme.colors.white} transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }


`

const Loader = () => {
    return (
        <Wrapper>
            <StyledLoader className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </StyledLoader>
        </Wrapper>
    )
};

export default Loader;