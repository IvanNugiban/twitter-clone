import React, {useEffect, useRef} from 'react';
import styled, {css} from "styled-components";
import IComponentWithChildren from "../../types/interfaces/IComponentWithChildren";
import CloseButton from "../atoms/CloseButton";
import useOutsideClickDetector from "../../hooks/useOutsideClickDetector";


const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
  background-color: rgba(153, 153, 153, 0.8);
`

const PopUpWithPadding = css`
  padding: 20px 200px 50px 200px;

  @media screen and ${({theme}) => theme.media.tablet} {
    padding: 30px;
  }
`

const StyledPopUp = styled.div<PopUpProps>`
  position: relative;
  background-color: ${({theme}) => theme.backgroundColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${({height}) => height ? height : "600px"};
  max-width: 1000px;
  width: ${({width}) => width};
  min-width: ${({minWidth}) => minWidth};
  overflow: auto;
  overflow-x: hidden;
  
  ${({withPadding}) => {
    if (withPadding) return PopUpWithPadding
  }};
  
  @media screen and (max-height: 900px) {
    height: ${({height}) => height ? height : "90%"};
  }

  
  
  @media screen and ${({theme}) => theme.media.tablet} {
    position: fixed;
    width: 100%;
    height: 100%;
    border-radius: 0;
    min-width: 100%;
    overflow-x: auto;
  }
`

interface IProps extends IComponentWithChildren {
    closePopUp: () => void;
    withPadding?: boolean;
    minWidth?: string;
    className?: string;
    width?: string;
    height?: string;
}

interface PopUpProps {
    withPadding: boolean;
    minWidth?: string;
    width?: string;
    height?: string;
}


const PopUp = ({children, closePopUp, withPadding = true, minWidth, className, width, height}: IProps) => {

    const PopUpRef = useRef(null)

    useOutsideClickDetector(PopUpRef, closePopUp)

    useEffect(() => {

        document.body.style.overflow = "hidden";

        const closeOnEscapeClick = (e: KeyboardEvent) => {
            if (e.key === "Escape") closePopUp();
        }

        document.body.addEventListener("keydown", closeOnEscapeClick)
        return () => {
            document.body.style.overflow = "visible";
            document.body.removeEventListener("keydown", closeOnEscapeClick)
        }
    }, [])

    return (
        <Wrapper aria-hidden="true" aria-haspopup="true">
            <StyledPopUp height={height} width={width} className={className} minWidth={minWidth} withPadding={withPadding} ref={PopUpRef}>
                <CloseButton position={{
                    left: "5px",
                    top: "5px"
                }} onClick={(e) => {
                    e.stopPropagation();
                    closePopUp();
                } }/>
                {children}
            </StyledPopUp>
        </Wrapper>
    )

};

export default PopUp;