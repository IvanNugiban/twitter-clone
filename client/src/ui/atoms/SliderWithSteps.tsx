import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`

  input[type='range'].n {
    display: block;
    margin: 1em auto;
    padding: 0;
    background: transparent;
    font-size: 1em;
    cursor: pointer;
    width: 100%;
    position: relative;
  }

  input[type='range'].n, input[type='range'].n::-webkit-slider-runnable-track, input[type='range'].n::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type='range'].n:after {
    content: "";
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background: ${({theme}) => theme.colors.main};
    position: absolute;
    right: 0;
  }

  input[type='range'].n:before {
    content: "";
    position: absolute;
    z-index: 0;
    left: 0;
    right: 0.8em;
    height: 1em;
    background: radial-gradient(circle at 0.5em 50%, ${({theme}) => theme.colors.main} 0.3125em, ${({theme}) => theme.colors.main} 0.3125em, ${({theme}) => theme.colors.main} 0.5em, transparent 0.5em), linear-gradient(90deg, transparent 0, ${({theme}) => theme.colors.main} 0) repeat-x 0 50%;
    box-sizing: border-box;
  }

  input[type='range'].n::-ms-track {
    border: none;
    color: transparent;
  }

  input[type='range'].n::-webkit-slider-thumb {
    border-radius: 50%;
    box-sizing: border-box;
    border: none;
    width: 1.35em;
    height: 1.35em;
    background: ${({theme}) => theme.colors.main };
    background-clip: content-box;
    position: relative;
    z-index: 10;
    margin-top: -0.1em;
    margin-left: 0.05em;
  }

  input[type='range'].n::-moz-range-thumb {
    border-radius: 50%;
    box-sizing: border-box;
    border: solid 0.35em transparent ;
    width: 1.3em;
    height: 1.3em;
    background: orange;
    background-clip: content-box;
    position: relative;
    z-index: 10;
    margin-top: -0.1em;
    margin-left: 0.05em;
  }

  input[type='range'].n::-ms-thumb {
    border-radius: 50%;
    box-sizing: border-box;
    border: solid 0.35em transparent;
    width: 1.35em;
    height: 1.35em;
    background: orange;
    background-clip: content-box;
    position: relative;
    z-index: 10;
    margin-top: -0.1em;
    margin-left: 0.05em;
  }

  input[type='range'].n::-ms-tooltip {
    display: none;
  }

  input[type='range'].n:focus {
    outline: none;
  }

  input[type='range'].n.n2:before {
    background-size: 100% 1em, 100% 0.25em;
  }

  input[type='range'].n.n3:before {
    background-size: 50% 1em, 100% 0.25em;
  }

  input[type='range'].n.n4:before {
    background-size: 33.3333333333% 1em, 100% 0.25em;
  }

  input[type='range'].n.n5:before {
    background-size: 25% 1em, 100% 0.25em;
  }

  input[type='range'].n.n6:before {
    background-size: 20% 1em, 100% 0.25em;
  }

  input[type='range'].n.n7:before {
    background-size: 16.6666666667% 1em, 100% 0.25em;
  }

  input[type='range'].n.n8:before {
    background-size: 14.2857142857% 1em, 100% 0.25em;
  }

  input[type='range'].n.n9:before {
    background-size: 12.5% 1em, 100% 0.35em;
  }

  input[type='range'].n.n10:before {
    background-size: 11.1111111111% 1em, 100% 0.25em;
  }
`

interface IProps {
    maxSteps: string;
    currentStep: string;
    onStepChange: (step: string) => void;
}

const SliderWithSteps = ({maxSteps, currentStep, onStepChange} : IProps) => {
    return (
        <Wrapper>
            <input onChange={(e) => onStepChange(e.target.value)} type='range' min="1" max={maxSteps} value={currentStep} step="1" className={`n n${maxSteps}`}/>
        </Wrapper>
    );
};

export default SliderWithSteps;