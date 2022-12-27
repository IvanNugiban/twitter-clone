import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";

interface CloseButtonProps {
    position?: {
        left?: string,
        top?: string,
        right?:string,
        bottom?: string
    }
    color?:string;
    className?: string;
    backgroundColor?: string;
}

interface IProps extends CloseButtonProps{
    onClick: (e : React.MouseEvent) => void;
}

const StyledCloseButton = styled.button<CloseButtonProps>`
  position: ${({position}) => position ? "absolute" : "initial"};
  ${({position}) => ({...position})}
  cursor: pointer;
  z-index: 1200;
  padding: 10px 14px 6px 14px;
  border-radius: 50%;
  transition: 0.2s background-color;
  color: ${({color, theme}) => color ? color : theme.colors.black};
  background-color: ${({backgroundColor}) => backgroundColor};
  
  &:hover,
  &:focus {
    background-color: ${({theme, color}) => color ? "rgba(0, 0, 0, 0.1)" : theme.colors.gray_thin};
  }

  &:active {
    background-color: ${({theme, color}) => color ? "rgba(0, 0, 0, 0.2)" : theme.colors.gray};
  }
`

const CloseButton = ({onClick, position, color, className, backgroundColor}: IProps) => {
    return (
        <StyledCloseButton backgroundColor={backgroundColor} className={className} color={color} position={position} aria-label="Close" onClick={(e) => onClick(e)}>
        <FontAwesomeIcon  fontSize="1.2rem" icon={solid("xmark")}/>
        </StyledCloseButton>
    );
};

export default CloseButton;