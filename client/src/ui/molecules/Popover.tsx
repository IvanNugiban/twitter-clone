import React, {RefObject, useRef} from 'react';
import styled from "styled-components";
import useOutsideClickDetector from "../../hooks/useOutsideClickDetector";
import useElementWidth from "../../hooks/useElementWidth";


const StyledPopover = styled.div<PopoverProps>`
  position: absolute;
  transform: translate(0, -100%);
  top: ${({top, bottom}) => !bottom && `${top}px`};
  bottom: ${({bottom}) => bottom};
  left: ${({left}) => `${left}px`};
  background-color: ${({theme}) => theme.backgroundColor};
  z-index: 1500;
  box-shadow: 0 0 5px 0 ${({theme}) => theme.colors.black};
  min-width: ${({width}) => width ? width : "100%"};
  max-width: ${({maxWidth}) => maxWidth};
  min-height: ${({minHeight}) => minHeight};
  max-height:${({maxHeight}) => maxHeight};
  overflow: ${({maxHeight}) => maxHeight && "auto"};
  padding: 10px 0 20px 0;
  transition: 0.2s all;
  border-radius: 20px;

  &:after {
    content: '';
    position: absolute;
    ${({arrowPosition}) => {
      if (arrowPosition === "top") return `top: -8px;
         transform: rotate(180deg);`
      return "bottom: -8px;"
    }}
    left: ${({arrowCoordinates}) => `${arrowCoordinates}px`};
    width: 0;
    height: 0;
    border-top: solid 10px ${({theme}) => theme.backgroundColor};
    border-left: solid 10px transparent;
    border-right: solid 10px transparent;
  }

`

const PopoverTitle = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.colors.gray_thin};
  padding-bottom: 10px;
`

const PopoverBody = styled.div`
  padding-top: 10px;
`

type JsxOrString = React.ReactNode | string;

interface PopoverProps {
    isActive: boolean;
    width?: string;
    maxWidth?: string;
    minHeight?: string;
    maxHeight?: string;
    arrowCoordinates: number;
    left: number;
    top: number;
    bottom?: string;
    arrowPosition: "top" | "bottom"
}


interface IProps {
    isActive: boolean;
    width?: string;
    maxWidth?: string;
    minHeight?: string;
    maxHeight?: string;
    closePopover: (e: MouseEvent | TouchEvent) => void;
    className?: string;
    body: JsxOrString;
    title?: JsxOrString;
    parentRef?: RefObject<HTMLElement>;
    left?: number;
    top?: number;
    bottom?: string;
    arrowPosition?: "top" | "bottom"
}


const Popover = ({
                     isActive,
                     closePopover,
                     className,
                     body,
                     title,
                     width,
                     parentRef,
                     left = 0,
                     top = -20,
                     arrowPosition = "bottom",
                     maxWidth,
                     minHeight,
                     maxHeight,
                     bottom
                 }: IProps) => {


    const popoverRef = useRef<HTMLDivElement>(null);
    useOutsideClickDetector(popoverRef, closePopover)

    const parentElementWidth = useElementWidth(parentRef);


    if (!isActive) return null;


    return (
        <StyledPopover
            arrowPosition={arrowPosition}
            top={top}
            left={left}
            bottom={bottom}
            arrowCoordinates={parentElementWidth ? parentElementWidth / 2 + Math.abs(left) - 10 : 10}
            width={width} maxWidth={maxWidth} minHeight={minHeight} maxHeight={maxHeight} className={className} isActive={isActive}
            ref={popoverRef}>
            {title && <PopoverTitle>{title}</PopoverTitle>}
            <PopoverBody>{body}</PopoverBody>
        </StyledPopover>
    );
};

export default Popover;