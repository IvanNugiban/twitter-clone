import React from 'react';
import styled from "styled-components";

const ZoomInput = styled.input`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 2px;
  background: #3f51b5;
  
  
  &::-moz-range-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 1px solid #3f51b5;
    background: #3f51b5;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 1px solid #3f51b5;
    background: #3f51b5;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }


  &:hover::-webkit-slider-thumb {
    box-shadow: 0 0 0 8px rgba(63, 81, 181, 0.16);
    border-radius: 50%;
  }

  &:hover::-moz-range-thumb {
    box-shadow: 0 0 0 8px rgba(63, 81, 181, 0.16);
  }


  &:before {
    font-family: "Font Awesome 5 Free",sans-serif;
    font-weight: 900;
    content: "\\f010";
    color: ${({theme}) => theme.colors.black};
    margin-right: 10px;
    position: absolute;
    left: -25px;
    transform: translate(0, -50%);
  }

  &:after {
    font-family: "Font Awesome 5 Free",sans-serif;
    font-weight: 900;
    content: "\\f00e";
    color: ${({theme}) => theme.colors.black};
    position: absolute;
    right: -25px;
    transform: translate(0, -50%);
  }
`

interface IProps {
    zoom: number;
    setZoom:  React.Dispatch<React.SetStateAction<number>>;
}

const ZoomSlider = ({zoom, setZoom} : IProps) => {
    return (
        <ZoomInput
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => {
                setZoom(Number(e.target.value));
            }}
        />
    );
};

export default ZoomSlider;