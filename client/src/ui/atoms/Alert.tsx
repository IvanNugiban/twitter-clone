import React, {useEffect, useState} from 'react';
import styled from "styled-components";

interface IProps {
    text: string;
    interval: number;
}

const StyledAlert = styled.div`
  position: fixed;
  z-index: 2000;
  word-break: break-word;
  color: ${({theme}) => theme.colors.white};
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 10px 20px;
  background-color: ${({theme}) => theme.colors.main};
`

const Alert = ({text, interval}: IProps) => {

    const [isVisible, setVisibility] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisibility(false)
        }, interval)
    }, [])

    if (!isVisible) return null;

    if (text === "Auth error") return null;

    return (
        <StyledAlert>
            {text ? text : "An unknown error has occurred. Please try again"}
        </StyledAlert>
    );
};

export default Alert;